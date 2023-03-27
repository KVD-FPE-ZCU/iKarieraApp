import HomePage from '../pages/home.f7';
import AboutPage from '../pages/about.f7';
import AccountPage from '../pages/account.f7'
import SettingPage from '../pages/settings.f7';
import FirstVisitPage from '../pages/first-visit.f7'
import SelfknowledgePage from '../pages/selfknowledge-main.f7';
import SelfknowledgeHistoryPage from '../pages/selfknowledge-history.f7';
import SelfknowledgeTestPage from '../pages/selfknowledge-test.f7'
import SelfknowledgeDonePage from '../pages/selfknowledge-done.f7'
import SelfknowledgeSummaryPage from '../pages/selfknowledge-summary.f7'
import ProgressPage from '../pages/progress-main.f7';
import ProgressIdeaPage from '../pages/progress-idea.f7';
import ProgressStepsPage from '../pages/progress-steps.f7';
import ProgressStepDetailPage from '../pages/progress-step-detail.f7';

import NotFoundPage from '../pages/404.f7';

import User from './user-class.js';
import * as utils from './utils.js';

function isLoggedIn() {
  let user = new User();
  return user.isUser();
}

function checkAuth(resolve, reject, router) {
  if (!isLoggedIn()) {
    reject();
    router.navigate('/vitej/');
  }
  else resolve();
}

var routes = [
  {
    path: '/',
    component: HomePage,
    beforeEnter: ({ resolve, reject, router }) => {
      let fs = utils.getFontSize();
      if (fs === -1) {
        reject();
        router.navigate('/vitej/');
      } else {
        resolve();
      }
    },
  },
  {
    path: '/sebepoznani/',
    component: SelfknowledgePage,
    beforeEnter: ({ resolve, reject, router }) => {
      let fs = utils.getFontSize();
      if (fs === -1) {
        reject();
        router.navigate('/vitej/');
      } else {
        resolve();
      }
    },
    routes: [
      {
        path: 'test/',
        component: SelfknowledgeTestPage,
        beforeEnter: ({ resolve, reject, router }) => checkAuth(resolve, reject, router),
        transition: 'f7-dive',
        routes: [
          {
            path: ':id/',
            component: SelfknowledgeTestPage,
            beforeEnter: ({ resolve, reject, router }) => checkAuth(resolve, reject, router),
          },
        ]
      },
      {
        path: 'souhrn/',
        component: SelfknowledgeSummaryPage,
        beforeEnter: ({ resolve, reject, router }) => checkAuth(resolve, reject, router),
        transition: 'f7-dive',
      },
      {
        path: 'souhrn/:date',
        component: SelfknowledgeSummaryPage,
        beforeEnter: ({ resolve, reject, router }) => checkAuth(resolve, reject, router),
        transition: 'f7-dive',
      },
      {
        path: 'souhrn/zobraz/:historyDate',
        component: SelfknowledgeSummaryPage,
        beforeEnter: ({ resolve, reject, router }) => checkAuth(resolve, reject, router),
        transition: 'f7-dive',
      },
      {
        path: 'finale/',
        component: SelfknowledgeDonePage,
        beforeEnter: ({ resolve, reject, router }) => checkAuth(resolve, reject, router),
        transition: 'f7-dive',

      },

    ]
  },
  {
    path: '/pokrok/',
    component: ProgressPage,
    beforeEnter: ({ resolve, reject, router }) => {
      let fs = utils.getFontSize();
      if (fs === -1) {
        reject();
        router.navigate('/vitej/');
      } else {
        resolve();
      }
    },
    routes: [
      {
        path: 'zlepseni/',
        component: ProgressIdeaPage,
        beforeEnter: ({ resolve, reject, router }) => checkAuth(resolve, reject, router),
        transition: 'f7-dive',
      },
      {
        path: 'kroky/',
        component: ProgressStepsPage,
        beforeEnter: ({ resolve, reject, router }) => checkAuth(resolve, reject, router),
        transition: 'f7-dive',
        routes: [
          {
            path: 'detail/:step',
            component: ProgressStepDetailPage,
            beforeEnter: ({ resolve, reject, router }) => checkAuth(resolve, reject, router),
            transition: 'f7-dive',
          },
        ],
      },
    ]
  },
  {
    path: '/profil/',
    component: AccountPage,
  },
  {
    path: '/nastaveni/',
    component: SettingPage,
  },
  {
    path: '/o-aplikaci/',
    component: AboutPage,
  },
  {
    path: '/sebepoznani/historie',
    component: SelfknowledgeHistoryPage,
  },
  {
    path: '/vitej/',
    component: FirstVisitPage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;