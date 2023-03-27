import * as msal from "@azure/msal-browser";

export default class MSAuth {
    constructor () {
        //MSAL configuration
        const msalConfig = {
            auth: {
                clientId: '79211fb7-5e25-4d24-ab1d-d1821dbe3d4c',
                // comment out if you use a multi-tenant AAD app
                authority: 'https://login.microsoftonline.com/9bd5c768-90b8-4e4f-8416-147729d91c53',
                redirectUri: 'http://localhost:3000'
            }
        };
        this.msalRequest = { scopes: [] };
        //Initialize MSAL client
        this.msalClient = new msal.PublicClientApplication(msalConfig);
    }

    ensureScope (scope) {
        if (!this.msalRequest.scopes.some((s) => s.toLowerCase() === scope.toLowerCase())) {
            this.msalRequest.scopes.push(scope);
        }
    }

    // Log the user in
    async signIn() {
        // Popover
        const authResult = await this.msalClient.loginPopup(this.msalRequest);
        sessionStorage.setItem('msalAccount', authResult.account.username);
        
        // Redirect
        /*const username = await this.msalClient.handleRedirectPromise().then((response) => {
            if (response !== null) {
                return response.account.username;
            } else {
                const currentAccounts = this.msalClient.getAllAccounts();
        
                if (currentAccounts.length === 0) {
                    this.msalClient.loginRedirect(loginRequest);
                } else if (currentAccounts.length > 1) {
                    // Add choose account code here
                } else if (currentAccounts.length === 1) {
                    return currentAccounts[0].username;
                }
            }
        });
        sessionStorage.setItem('msalAccount', username);
        */        
    }
    //Get token from Graph
    async getToken() {
        let account = sessionStorage.getItem('msalAccount');
        if (!account) {
            throw new Error(
                'User info cleared from session. Please sign out and sign in again.');
        }
        try {
            // First, attempt to get the token silently
            const silentRequest = {
                scopes: this.msalRequest.scopes,
                account: this.msalClient.getAccountByUsername(account)
            };

            const silentResult = await this.msalClient.acquireTokenSilent(silentRequest);
            return silentResult.accessToken;
        } catch (silentError) {
            // If silent requests fails with InteractionRequiredAuthError,
            // attempt to get the token interactively
            if (silentError instanceof msal.InteractionRequiredAuthError) {
                const interactiveResult = await this.msalClient.acquireTokenPopup(this.msalRequest);
                return interactiveResult.accessToken;
            } else {
                throw silentError;
            }
        }
    }
}