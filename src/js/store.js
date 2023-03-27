
import { createStore } from 'framework7';

import Cache from './storeCache.js';
import User from './user-class.js';
import * as utils from './utils.js';
import QuestionGroup from './choices-class.js';

const store = createStore({
    state: {
        questions: [
            {
                id: '1',
                title: '1. Jak jsi přizpůsobivý?',
                title_short: 'Přizpůsobivost',
                title_zhodnoceni: 'Moje přizpůsobivost je na úrovni:',
                section: 'section_prizpusobivost',
                subitem: 'ot_1',
                levels: {
                    0: ['Na změny reaguji negativně.', 'Nové myšlenky a podněty zpracovávám těžko.'],
                    1: ['Obtížně se vyrovnávám se změnami.', 'Stereotypy v mém životě sehrávají důležitou roli.'],
                    2: ['Na přijetí nových myšlenek a podnětů potřebuji čas.', 'Jsem schopen přenášet pozornost mezi menším počtem úkolů, je-li to požadováno.'],
                    3: ['Změny akceptuji bez problémů.', 'Nebráním se novým metodám a postupům, ale sám takové situace nevyhledávám.'],
                    4: ['Změny a nové myšlenky vítám, vidím v nich příležitosti, sám je vyhledávám.', 'Nebojím se rizika nepoznaných cest.'],
                    5: ['Aktivně prosazuji změny a přebírám za ně odpovědnost.', 'Jsem iniciátorem nových myšlenek, mám inovativní a kreativní myšlení.']
                },
                svg_part_id: '_00'
            },
            {
                id: '2',
                title: '2. Jak jsi samostatný?',
                title_short: 'Samostatnost',
                title_zhodnoceni: 'Moje samostatnost je na úrovni:',
                section: 'section_samostatnost',
                subitem: 'ot_2',
                levels: {
                    0: ['Ani jednoduché definované úkoly neplním s jistotou.', 'Neumím se samostatně rozhodovat.'],
                    1: ['Samostatně plním pouze jednoduché, přesné úkoly.', 'Potřebuji vedení, dohled a kontrolu.'],
                    2: ['Samostatně plním jen zaběhlé úkoly.', 'Vyhovují mi instrukce, návody a předpisy.'],
                    3: ['Samostatně plním zadané úkoly.', 'Pomoc jiných vyhledávám jen v případě potřeby.'],
                    4: ['Řídím sám sebe, umím své síly odhadnout i získávat informace.', 'Jsem schopen se pružně rozhodovat a nebojím se odpovědnosti.'],
                    5: ['Řídím sám sebe, umím své síly odhadnout a rozplánovat jednotlivé kroky k dosažení cíle.', 'Rychle a pružně se rozhoduji a nebojím se nést osobní riziko, protože ho umím dobře posoudit.']
                },
                svg_part_id: '_01'
            },
            {
                id: '3',
                title: '3. Jakou máš chuť se celoživotně učit?',
                title_short: 'Celoživotní učení',
                title_zhodnoceni: 'Moje celoživotní učení je na úrovni:',
                section: 'section_uceni',
                subitem: 'ot_3',
                levels: {
                    0: ['Necítím potřebu dalšího rozvoje, ke vzdělávání zaujímám negativní postoj.', 'Nerozvíjím se ani novými zkušenostmi, ani prostřednictvím vzdělávacích programů.'],
                    1: ['Pokud je to nutné, jsem ochoten se vzdělávat.', 'Jsem schopen osvojit si nové dovednosti, pokud souvisejí s mými současnými.'],
                    2: ['Při vzdělávání preferuji jen to, co mě zajímá.', 'Znám své silné a slabé stránky, ale nerozvíjím je cíleně.'],
                    3: ['Jsem přirozeně zvídavý a otevřený novým zkušenostem i znalostem.', 'Aktivně se vzdělávám a své silné stránky dále rozvíjím.'],
                    4: ['Aktivně vyhledávám a přijímám nové informace a zkušenosti. Dokážu je aplikovat do života. Pro ostatní můžu být zdrojem informací.', 'Umím posoudit své úspěchy a neúspěchy a vytvářím si plán dalšího vzdělávání - rozvoje.'],
                    5: ['Aktivně pracuji na prohlubování své odbornosti, na rozvoji svém i druhých.', 'Sdílím znalosti a zajišťuji, aby znalosti byly sdíleny.']
                },
                svg_part_id: '_02'
            },
            {
                id: '4',
                title: '4. Umíš řešit problémy?',
                title_short: 'Řešení problémů',
                title_zhodnoceni: 'Moje schopnost řešení problémů je na úrovni:',
                section: 'section_problemy',
                subitem: 'ot_4',
                levels: {
                    0: ['Nedokážu rozpoznat problémy nebo je ignoruji.', 'Vyhýbám se řešení problémů, jsem pasivní.'],
                    1: ['Pouštím se do problémů, jen když mám jistotu, že znám řešení.', 'Zpravidla potřebuji pomoc druhých.'],
                    2: ['Samostatně řeším jednodušší problémy.', 'Řešení komplikovanějších problémů bývá nesystematické.'],
                    3: ['Přistupuji k řešení problému aktivně a samostatně.', 'Dokážu najít a definovat podstatu i u složitějších problémů.'],
                    4: ['Dokážu definovat příčiny a následky problému i jim předcházet tvorbou standardů.', 'Využívám jak analytické, tak kreativní myšlení.'],
                    5: ['Je mi vlastní samostatné i týmové řešení problémů, jsem schopen vést řešitelské týmy.', 'Na základě svých zkušeností se spoléhám na svou intuici, využívám kreativní myšlení a dokážu překonávat stereotypy myšlení.']
                },
                svg_part_id: '_03'
            },
            {
                id: '5',
                title: '5. Jak jsi tvořivý?',
                title_short: 'Tvořivost',
                title_zhodnoceni: 'Moje tvořivost je na úrovni:',
                section: 'section_tvorivost',
                subitem: 'ot_5',
                levels: {
                    0: ['Na změny a nové nápady reaguji negativně, preferuji stereotypní práci a postupy.', 'Nepřicházím s novými nápady, bojím se rizik a vyhýbám se jim.'],
                    1: ['Změny a riskantní řešení nevyhledávám.', 'Jen na podnět dokážu vymyslet jednoduchá zlepšení.'],
                    2: ['Jsem schopný přijít s náměty na zlepšení, ale nedokážu je samostatně připravit a realizovat.', 'Rizika vnímám, ale špatně odhaduji.'],
                    3: ['Aktivně vyhledávám příležitosti ke zlepšení, mám intuici pro podnikatelské příležitosti, mám odvahu k realizaci.', 'Rizika vnímám, ale nezabývám se jejich prevencí.'],
                    4: ['Neustále připravuji a realizuji změny a nové projekty.', 'Rizika jsem schopen rychle vyhodnotit a snažím se je eliminovat.'],
                    5: ['Podnikatelská intuice a strategické myšlení mi umožňují připravit a realizovat nové záměry a systematicky pracuji s riziky.', 'Jsem schopen využít a ocenit myšlenky a nápady ve svém okolí.']
                },
                svg_part_id: '_04'
            },
            {
                id: '6',
                title: '6. Jak umíš plánovat a organizovat?',
                title_short: 'Plánování',
                title_zhodnoceni: 'Moje schopnost plánování je na úrovni:',
                section: 'section_planovani',
                subitem: 'ot_6',
                levels: {
                    0: ['Úkoly plním nahodile, neplánuji, selhávám ve výkonu.', 'Řeším až neodkladné organizační věci.'],
                    1: ['Můj výkon bývá často nestabilní, nerozlišuji priority.', 'Sám plním úkoly nesystematicky, potřebuji být řízen.'],
                    2: ['Plánuji aktivity v závislosti na naléhavosti, nedokážu však rozhodovat samostatně.', 'V případě nutnosti vytvářím varianty plánu.'],
                    3: ['Plánuji krátkodobě i dlouhodobě v souladu s plány okolí.', 'Organizuji svou činnost i jsem schopen zorganizovat činnost druhých.'],
                    4: ['Umím organizovat efektivně sebe i druhé, snažím se svůj výkon zlepšovat, pracuji s riziky.', 'Vytvářím varianty plánu a efektivně směřuji k cíli, vyhodnocuji jeho naplňování.'],
                    5: ['Vytvářím vize, efektivně stanovuji i vyhodnocuji cíle a priority, předvídám rizika.', 'Rozvíjím potenciál k výkonnosti sebe a druhých, umím delegovat práci.']
                },
                svg_part_id: '_05'
            },
            {
                id: '7',
                title: '7. Jsi akční?',
                title_short: 'Akčnost',
                title_zhodnoceni: 'Moje akčnost je na úrovni:',
                section: 'section_akcnost',
                subitem: 'ot_7',
                levels: {
                    0: ['Jsem pasivní, nezajímám se o dění kolem sebe.', 'Nemám žádnou snahu něco zlepšit, jen pod tlakem okolí.'],
                    1: ['Plním činnosti a úkoly, pokud dostanu jasné zadání a jsem veden.', 'Neúspěch nebo komplikace mě snadno odradí.'],
                    2: ['K obvyklým a jasně definovaným úkolům přistupuji aktivně, ale potřebuji motivaci z venku.', 'Dokážu řešit běžné problémy a situace, pokud na ně nestačím, vyhledám pomoc.'],
                    3: ['Zajímám se o dění kolem, hledám řešení, nové aktivity, postupy a možnosti.', 'Když jsem motivován, zapojuji se nad rámec běžných povinností i přes neúspěch a komplikace.'],
                    4: ['Jsem činorodý, intenzivně se zajímám o dění kolem sebe, aktivně vyhledávám řešení, nové aktivity, postupy a možnosti, angažuji se nad rámec.', 'Předvídám překážky a činím preventivní opatření.'],
                    5: ['Jsem přirozeně aktivní, mám pozitivní přístup k životu i k práci.', 'Ovlivňuji dění kolem sebe, aktivně vyhledávám řešení, nové aktivity, postupy a možnosti, vytvářím příležitosti i pro druhé.']
                },
                svg_part_id: '_06'
            },
            {
                id: '8',
                title: '8. Jak jsi výkonný?',
                title_short: 'Výkonnost',
                title_zhodnoceni: 'Moje výkonnost je na úrovni:',
                section: 'section_vykonnost',
                subitem: 'ot_8', levels: {
                    0: ['Nedosahuji požadovaného výkonu, jsem nespolehlivý.', 'Pro výkon potřebuji kontrolu z venku, sleduji pouze osobní cíle.'],
                    1: ['Snažím se podávat výkon, ale ne vždy dosáhnu požadovaného výsledku.', 'Problematicky přijímám zpětnou vazbu, nepřemýšlím nad smyslem úkolu.'],
                    2: ['Většinou dosahuji spolehlivého a stabilního výkonu, ale potřebuji nad sebou kontrolu.', 'Orientuji se na výkon i na přínos, přijímám zpětnou vazbu.'],
                    3: ['Můj výkon je spolehlivý a stabilní dle potřeb zadavatele.', 'Nemusím být příliš kontrolován, reaguji na zpětnou vazbu a dokážu se poučit z chyb, umím se namotivovat i sebekontrolovat.'],
                    4: ['Můj výkon je vysoce spolehlivý a stabilní, mám velké osobní nasazení.', 'Mé osobní a týmové cíle jsou v souladu, zvyšuji efektivitu výkonu, jsem schopen sebekontroly a sebemotivace, včetně sebezdokonalování.'],
                    5: ['Můj výkon a výsledek je nadstandardní, motivuji sebe i ostatní.', 'Konstruktivně přijímám i poskytuji zpětnou vazbu, vítám sebezdokonalování.']
                },
                svg_part_id: '_07'
            },
            {
                id: '9',
                title: '9. Jak zvládáš zátěž?',
                title_short: 'Zvládání zátěže',
                title_zhodnoceni: 'Moje zvládání zátěže je na úrovni:',
                section: 'section_zatez',
                subitem: 'ot_9',
                levels: {
                    0: ['Nejsem schopen v zátěži podat výkon, při mírném tlaku zpanikařím, mám obavy ze selhání.', 'V zátěžových situacích reaguji nepřiměřeně, nezvládám vlastní emoce, nevěřím si.'],
                    1: ['V zátěžové situaci se těžko soustřeďuji, změny vnímám negativně.', 'Neúspěch nesu velmi těžce, příliš si nevěřím, potřebuji povzbuzení a podporu k zvládnutí úkolu.'],
                    2: ['V běžných zátěžových situacích ovládám své emoce a reaguji přiměřeně, podávám přiměřený výkon, při vyšší zátěži ztrácím sebejistotu.', 'Změny akceptuji, pokud jim rozumím a snažím se jim přizpůsobit.'],
                    3: ['V zátěžových situacích reaguji vyrovnaně, podávám přiměřený výkon i při dlouhodobé zátěži, věřím si.', 'Neúspěch beru jako součást života a ustojím jej, umím požádat o pomoc.'],
                    4: ['Podávám velmi dobrý výkon i v zátěžových situacích, jsem vytrvalý, důvěřuji svým schopnostem, zvládnu i rutinní činnost, mám silnou vůli.', 'Neúspěch chápu jako příležitost udělat to příště lépe, změny vítám.'],
                    5: ['Odvádím velmi dobrý výkon i v extrémně složitých podmínkách, zachovávám si nadhled a odstup, jsem oporou druhým, mám vysokou sebedůvěru.', 'Při plnění rutinních úkonů se dokážu oprostit od vnějších vlivů a soustředím se v danou chvíli pouze na příslušný cíl.']
                },
                svg_part_id: '_08'
            },
            {
                id: '10',
                title: '10. Jak se orientuješ v informacích?',
                title_short: 'Orientace',
                title_zhodnoceni: 'Moje schopnost orientace je na úrovni:',
                section: 'section_orientace',
                subitem: 'ot_10',
                levels: {
                    0: ['Informace přijímám pasivně, pracuji s omezeným množstvím informací.', 'Informace dohledávám i využívám nesystematicky a neověřuji je.'],
                    1: ['Informace vyhledávám stereotypně a účelově.', 'Informace umím uspořádat dle velmi jednoduchých daných postupů.'],
                    2: ['Umím rozpoznat podstatné informace a třídit je, pokud se týkají oblastí, v nichž se dobře orientuji, zvládám jednoduchou dokumentaci.', 'Technologie využívám na základní úrovni.'],
                    3: ['Orientuji se dobře ve větším množství informací, umí rozlišit podstatné od nepodstatného, nezkresluji je, dokumentuji.', 'Dokážu využívat technologie, aplikuji informace v praxi.'],
                    4: ['Cíleně vyhledávám informace, ověřuji si důvěryhodnost zdrojů.', 'Strukturuji a dokumentuji získané informace inovativním způsobem.'],
                    5: ['Propojuji informace z různých nových zdrojů i pro využití ostatními.', 'Jsem schopen zorientovat se v různých typech databází, vybrat klíčové informace pro daný účel, propojit a dokumentovat je.']
                },
                svg_part_id: '_09'
            },
            {
                id: '11',
                title: '11. Umíš efektivně komunikovat?',
                title_short: 'Komunikace',
                title_zhodnoceni: 'Moje schopnost komunikace je na úrovni:',
                section: 'section_komunikace',
                subitem: 'ot_11',
                levels: {
                    0: ['Jakékoliv formulování myšlenek je pro mě problematické.', 'Mé reakce na nečekané situace nelze předvídat.'],
                    1: ['Formulování myšlenek, zejména v písemné podobě, je pro mě obtížné.', 'Mívám problémy s nasloucháním druhým a informace předávám pouze na vyžádání.'],
                    2: ['V běžných situacích se mi daří být srozumitelný ve svých formulacích.', 'Bez větších potíží naslouchám ostatním, sdílím informace, i když má komunikace není vždy přesvědčivá.'],
                    3: ['Dovedu jasně a srozumitelně formulovat myšlenky a zároveň naslouchat ostatním.', 'Svým projevem dokážu zaujmout ostatní a sám toleruji názory jiných.'],
                    4: ['Dokážu otevřít, zahájit komunikaci a dovedu se zdravě a přiměřeně prosazovat.', 'Vítám a rozvíjím názory ostatních, aktivně naslouchám a vyžaduji zpětnou vazbu.'],
                    5: ['Písemné i ústní formulování myšlenek zvládám na výborné úrovni a dovedu komunikovat i s jinými kulturami.', 'Pracuji se zpětnou vazbou, dokážu od druhých získat jejich skutečné názory a umím s nimi pracovat.']
                },
                svg_part_id: '_10'
            },
            {
                id: '12',
                title: '12. Jak umíš spolupracovat?',
                title_short: 'Spolupráce',
                title_zhodnoceni: 'Moje schopnost spolupráce je na úrovni:',
                section: 'section_spoluprace',
                subitem: 'ot_12',
                levels: {
                    0: ['Spolupráce se mnou je velmi problematická.', 'Má ochota a zájem pracovat ve skupině směrem ke společnému cíli je zanedbatelná.'],
                    1: ['Jsem spíše aktivní než pasivní a příliš se neztotožňuji se skupinovým cílem.', 'Dělám jen to, co je nezbytně nutné a informace poskytuji jen na vyžádání.'],
                    2: ['Jsem spíš aktivní než pasivní a přizpůsobuji se požadovanému chování ve skupině.', 'Respektuji skupinové cíle, sdílím informace, ale aktivně je nenabízím.'],
                    3: ['Aktivně spolupracuji, jsem ochotný a sehrávám pozitivní roli ve skupině.', 'Sdílím, nabízím informace a respektuji druhé i výsledky jejich úsilí.'],
                    4: ['Aktivně působím na tvůrčí atmosféru ve skupině.', 'Jsem schopen přebírat odpovědnost za společné výsledky.'],
                    5: ['Ve skupině působím jako přirozený a nenucený vůdce s přirozenou autoritou.', 'Jsem schopen spolupráce v mezinárodních, kulturně rozmanitých týmech.']
                },
                svg_part_id: '_11'
            },
            {
                id: '13',
                title: '13. Jsi vstřícný?',
                title_short: 'Vstřícnost',
                title_zhodnoceni: 'Moje vstřícnost je na úrovni:',
                section: 'section_vstricnost',
                subitem: 'ot_13',
                levels: {
                    0: ['Nezajímám se o potřeby zákazníka, jsem neochotný a nevstřícný.', 'Jsem uzavřený nezvládám emoce a nemám chuť komunikovat.'],
                    1: ['Vůči zákazníkovi jsem pasivní bez negativních projevů.', 'Nedostatečně posuzuji zákazníkovy potřeby.'],
                    2: ['Mám snahu vyhovět zákazníkovi, ale ne vždy předvídám a rozeznávám jeho potřeby.', 'Jsem schopen vstřícného jednání, ale vyjednávám instinktivně a mám obavy z nových kontaktů.'],
                    3: ['Dokážu zjistit a uspokojit zákazníky potřeby, jednám vstřícně a příjemně, kontroluji své emoce.', 'Znám svou firmu/produkty/služby/zákazníky a snažím se získat zpětnou vazbu.'],
                    4: ['Předvídám potřeby a očekávání zákazníka a usiluji o spokojenost.', 'Dokážu vyjednávat, zvládám konfliktní situace a přijímám osobní zodpovědnost.'],
                    5: ['Jsem vzorem vstřícného chování a vystupování vůči zákazníkům.', 'Mám snahu o neustálé zlepšování vztahů, jsem důvěryhodný a umím zákazníka přesvědčit a ovlivnit.']
                },
                svg_part_id: '_12'
            },
            {
                id: '14',
                title: '14. Umíš vést druhé?',
                title_short: 'Vedení druhých',
                title_zhodnoceni: 'Moje schopnost vedení druhých je na úrovni:',
                section: 'section_vedeni',
                subitem: 'ot_14',
                levels: {
                    0: ['Odmítám zodpovědnost vedoucího, tuto pozici nezvládám nebo o ni nestojím.', 'Zadávání úkolů ostatním je pro mě problém a můj postoj může odrazovat a demotivovat mé podřízené.'],
                    1: ['Snažím se přijmout zodpovědnost za skupinový výkon a výsledky, jen pokud je to po mně žádáno.', 'V případě potřeby vedu 2 až 3 členné týmy, ale v kontrole plnění zadání mám rezervy a nijak cíleně nerozvíjím ostatní.'],
                    2: ['Přijímám zodpovědnost za malý tým (do 10 lidí), ale v kontrole výsledků mám rezervy.', 'Dávám instrukce, demonstruji úkoly, dávám užitečné rady, jdu osobním příkladem.'],
                    3: ['Chci zodpovídat za skupinový výkon a výsledek, chci vést a vedu ostatní a dokážu se za ně postavit.', 'Kontroluji realizaci cílů a úkolů, snažím se zvyšovat výkonnost ostatních a podporuji je v jejich rozvoji.'],
                    4: ['Přebírám odpovědnost za skupinový výkon a sám jsem vzorem pro druhé.', 'Nebojím se obtíží a komplikovaných situací, ostatní na mě mohou spoléhat, jsem věrohodný a spolehlivý vůdce.'],
                    5: ['Jsem charismatický vůdce, cíleně rozvíjím a povzbuzuji ostatní členy týmu.', 'Organizuji, plánuji, informuji a zapojuji členy týmu do skupinové práce a podporuji je v úsilí se zdokonalovat.']
                },
                svg_part_id: '_13'
            },
            {
                id: '15',
                title: '15. Umíš ovlivňovat ostatní?',
                title_short: 'Ovlivňování ostatních',
                title_zhodnoceni: 'Moje schopnost ovlivňovat ostatní je na úrovni:',
                section: 'section_ovlivnovani',
                subitem: 'ot_15',
                levels: {
                    0: ['Nevykazuji žádné úsilí ovlivňovat ostatní nebo je přesvědčovat.', 'Mé prezentační dovednosti jsou nedostatečné.'],
                    1: ['Chtěl bych ovlivňovat druhé, ale nevyvíjím pro to žádné úsilí.', 'Můj (nejen) slovní projev obsahuje řadu nedostatků, což způsobuje má tréma a obava z cizích lidí nebo velkých skupin.'],
                    2: ['Aktivně se snažím ovlivňovat či přesvědčovat druhé, ale nedovedu se dostatečně přizpůsobit jejich znalostem, možnostem, schopnostem atd.', 'Pečlivě si připravuji informace a využívám fakta, čísla či příklady jako způsoby přímého přesvědčování.'],
                    3: ['Cíleně zohledňuji dopad svých slov a svého jednání na druhé.', 'Zvládám prezentaci i jednání s cizími lidmi nebo větší skupinou v rodném jazyce.'],
                    4: ['Svým projevem dokážu zaujmout posluchače a tréma na mě nemá vliv.', 'Po přípravě jsem schopen prezentovat v cizím jazyce a využívám k tomu více různých forem a metod.'],
                    5: ['Můj projev a prezentace dokáže ostatní vtáhnout a způsobuje, že sami přistupují na mé atraktivní nápady a řešení.', 'Zvládám s přehledem prezentaci a jednání před velkými skupinami v českém i cizím jazyce.']
                },
                svg_part_id: '_14'
            }
        ],
        user: '',
        fontSize: -1,
        userAge: -1,
        questionGroup: null,
        lastTestDate: null,
        testsDates: [],
        activeMenuItem: null,
    },
    getters: {
        questions({ state }) {
            return state.questions;
        },
        user({ state }) {
            return state.user;
        },
        fontSize({ state }) {
            return state.fontSize;
        },
        questionGroup({ state }) {
            return state.questionGroup;
        },
        userAge({ state }) {
            return state.userAge;
        },
        lastTestDate() {
            const c = new Cache('ch');
            let testDate = new Date();
            let prevTestDate = 0;

            for (let i = 0; testDate !== 0; i++) {
                testDate = c.get(`sc_selfknowledge_test_date_${i}`);
                if (testDate !== 0) {
                    prevTestDate = testDate;
                }
            }

            if (prevTestDate === 0) return null;
            return new Date(prevTestDate);
        },
        activeMenuItem({ state }) {
            return state.activeMenuItem;
        },
        testsDates({ state }) {
            return state.testsDates;
        },
        idea({ state }) {
            return state.progressIdea;
        },
    },
    actions: {
        getUser({ state }) {
            const u = new User();
            state.user = u.getUsername();
        },
        saveUser({ state }, { username }) {
            const u = new User();
            u.setUsername(username);
            state.user = username;
        },
        getFontSize({ state }) {
            state.fontSize = utils.getFontSize();
        },
        setFontSize({ state }, { size }) {
            utils.setFontSize(size);
            state.fontSize = utils.getFontSize();
        },
        setAge({ state }, { age }) {
            const cache = new Cache('ua');
            cache.set('age', age)
            state.userAge = age;
        },
        getAge({ state }) {
            const cache = new Cache('ua');
            let age = cache.get('age')
            state.userAge = age;
        },
        setLastTestDate({ state }, { date }) {
            state.lastTestDate = date;
        },
        getQuestionGroup({ state }, { app, date }) {
            let sl = state.lastTestDate === null ? 0 : state.lastTestDate;
            let ld = new Date(sl);

            if (!(sl === 0) && (ld.getTime() === date.getTime())) {
                return;
            }

            const qg = new QuestionGroup(app, 'Sebepoznání', 'sc_sebepoznani', new Date(date.getTime()), state.questions);
            state.questionGroup = qg;
        },
        getTestsDates({ state }) {
            const c = new Cache('ch');
            let testDate = new Date();
            let dates = [];

            for (let i = 0; testDate !== 0; i++) {
                testDate = c.get(`sc_selfknowledge_test_date_${i}`);
                if (testDate !== 0) {
                    let finished = c.get(`${i}_is_finished`);

                    if (finished) {
                        
                        dates.push(testDate);
                    }
                }
            }

            state.testsDates = dates;
        },
        setMenuItem({ state }, { item }) {
            state.activeMenuItem = item;
        },
        getIdea({ state }) {
            const c = new Cache('idea');
            state.progressIdea = c.get(`sc_progress_idea`);
        },
        setIdea({ state }, { idea }) {
            const cache = new Cache('idea');
            cache.set('sc_progress_idea', idea)
            state.progressIdea = idea;
        },
        clearState({ state }) {
            const cache = new Cache();
            cache.clear();
            state.user = '';
            state.fontSize = -1;
        },
    },
})
export default store;
