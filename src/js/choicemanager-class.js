import $ from 'dom7';
//import IDate from './idate/index';
import {utils} from 'framework7';
import QuestionGroup from './choices-class.js';

export default function ChoiceManagerConstructor (Framework7Class) {
    return class ChoiceManager extends Framework7Class {
        constructor(app, params = {}) {
            super(params, [app]);
            const self = this;
            this.params = utils.extend({}, app.params.choicemanager, params);

            // This needs complete rework... just use Object.keys() and use an array

            var $containerEl;
            if (self.params.containerEl) {
                $containerEl = $(self.params.containerEl);
                //if ($containerEl.length === 0) return self;
            }

            var $titleEl;
            if (self.params.titleEl) {
                $titleEl = $(self.params.titleEl);
            }

            var $descEl;
            if (self.params.descEl) {
                $descEl = $(self.params.descEl);
            }

            var $levelNumberZero;
            if (self.params.levelNumberZero) {
                $levelNumberZero = $(self.params.levelNumberZero);
            }

            var $levelNumberOne;
            if (self.params.levelNumberOne) {
                $levelNumberOne = $(self.params.levelNumberOne);
            }

            var $levelNumberTwo;
            if (self.params.levelNumberTwo) {
                $levelNumberTwo = $(self.params.levelNumberTwo);
            }

            var $levelNumberThree;
            if (self.params.levelNumberThree) {
                $levelNumberThree = $(self.params.levelNumberThree);
            }

            var $levelNumberFour;
            if (self.params.levelNumberFour) {
                $levelNumberFour = $(self.params.levelNumberFour);
            }

            var $levelNumberFive;
            if (self.params.levelNumberFive) {
                $levelNumberFive = $(self.params.levelNumberFive);
            }

            var $levelEl;
            if (self.params.levelEl) {
                $levelEl = $(self.params.levelEl);
            }

            var $levelUpEl;
            if (self.params.levelUpEl) {
                $levelUpEl = $(self.params.levelUpEl);
            }

            var $levelDownEl;
            if (self.params.levelDownEl) {
                $levelDownEl = $(self.params.levelDownEl);
            }

            var $prevEl;
            if (self.params.prevEl) {
                $prevEl = $(self.params.prevEl);
            }

            var $nextEl;
            if (self.params.nextEl) {
                $nextEl = $(self.params.nextEl);
            }

            var $saveEl;
            if (self.params.saveEl) {
                $saveEl = $(self.params.saveEl);
            }

            var $sectionZhodnoceniEl;
            if (self.params.sectionZhodnoceniEl) {
                $sectionZhodnoceniEl = $(self.params.sectionZhodnoceniEl);
            }

            var $zhodnoceniTextEl;
            if (self.params.zhodnoceniTextEl) {
                $zhodnoceniTextEl = $(self.params.zhodnoceniTextEl);
            }

            var $zhodnoceniImageEl;
            if (self.params.zhodnoceniImageEl) {
                $zhodnoceniImageEl = $(self.params.zhodnoceniImageEl);
            }

            var $zhodnoceniLevelInfoEl;
            if (self.params.zhodnoceniLevelInfoEl) {
                $zhodnoceniLevelInfoEl = $(self.params.zhodnoceniLevelInfoEl);
            }

            var $zhodnoceniDoporuceniEl;
            if (self.params.zhodnoceniDoporuceniEl) {
                $zhodnoceniDoporuceniEl = $(self.params.zhodnoceniDoporuceniEl);
            }

            var $questionsNumbersEl;
            if (self.params.questionsNumbersEl) {
                $questionsNumbersEl = $(self.params.questionsNumbersEl);
            }

            var $questionsNumbersEl;
            if (self.params.questionsNumbersEl) {
                $questionsNumbersEl = $(self.params.questionsNumbersEl);
            }

            var $questionNumber;
            if (self.params.questionNumber) {
                $questionNumber = self.params.questionNumber;
            }


            var view;
            if ($containerEl) {
                view = $containerEl.parents('.view').length && $containerEl.parents('.view')[0].f7View;
            }
            if (!view) view = app.views.main;

            utils.extend(self, {
                app,

                $containerEl,
                containerEl: $containerEl && $containerEl[0],
                inline: $containerEl && $containerEl.length > 0,

                $titleEl,
                titleEl: $titleEl && $titleEl[0],

                $descEl,
                descEl: $descEl && $descEl[0],

                $levelNumberZero,
                levelNumberZero: $levelNumberZero && $levelNumberZero[0],

                $levelNumberOne,
                levelNumberOne: $levelNumberOne && $levelNumberOne[0],

                $levelNumberTwo,
                levelNumberTwo: $levelNumberTwo && $levelNumberTwo[0],

                $levelNumberThree,
                levelNumberThree: $levelNumberThree && $levelNumberThree[0],

                $levelNumberFour,
                levelNumberFour: $levelNumberFour && $levelNumberFour[0],

                $levelNumberFive,
                levelNumberFive: $levelNumberFive && $levelNumberFive[0],

                $levelEl,
                levelEl: $levelEl && $levelEl[0],

                $levelUpEl,
                levelUpEl: $levelUpEl && $levelUpEl[0],

                $levelDownEl,
                levelDownEl: $levelDownEl && $levelDownEl[0],

                $prevEl,
                prevEl: $prevEl && $prevEl[0],

                $nextEl,
                nextEl: $nextEl && $nextEl[0],

                $saveEl,
                saveEl: $saveEl && $saveEl[0],

                $sectionZhodnoceniEl,
                sectionZhodnoceniEl: $sectionZhodnoceniEl && $sectionZhodnoceniEl[0],

                $zhodnoceniTextEl,
                zhodnoceniTextEl: $zhodnoceniTextEl && $zhodnoceniTextEl[0],

                $zhodnoceniImageEl,
                zhodnoceniImageEl: $zhodnoceniImageEl && $zhodnoceniImageEl[0],

                $zhodnoceniLevelInfoEl,
                zhodnoceniLevelInfoEl: $zhodnoceniLevelInfoEl && $zhodnoceniLevelInfoEl[0],

                $zhodnoceniDoporuceniEl,
                zhodnoceniDoporuceniEl: $zhodnoceniDoporuceniEl && $zhodnoceniDoporuceniEl[0],

                $questionsNumbersEl,
                questionsNumbersEl: $questionsNumbersEl && $questionsNumbersEl[0],

                $questionNumber,
                questionNumber: $questionNumber && $questionNumber[0],

                initialized: false,
                url: self.params.url,
                view,
                //animating: false,
            });

            //LOAD ITEMS
            if (this.params.loadQuestionFromApp && app.store.getters.questionGroup.value) {
                this.questions = app.store.getters.questionGroup.value;
            } else {
                let date = new Date();
                this.questions = new QuestionGroup(app, this.params.title, this.params.db_name, date, this.params.items);
            }

            //REMOVE TWO SIDE VIEW
            self.$containerEl.removeClass('scr-2');

            //EVENTS ON CLICK
            /**
             * On Level Up button click
             * @param e {Event}
             */
            function onLevelUpClick(e) {
                e.preventDefault();
                let aq = self.questions.actualQuestion();
                aq.levelUp();
                self.updateChoiceLevel(aq);
            }

            /**
             * On Level Down button click
             * @param e {Event}
             */
            function onLevelDownClick(e) {
                e.preventDefault();
                let aq = self.questions.actualQuestion();
                aq.levelDown();
                self.updateChoiceLevel(aq);
            }

            /**
             * On Prev Question button click
             * @param e {Event}
             */
            function onPrevQuestionClick(e) {
                e.preventDefault();

                if (self.$containerEl) {
                    if (self.params.twoSideOnSmallScreen) {
                        //u malých zařízeních rozděl pohled na hodnocení a detail
                        if ($(window).width() < 768) {
                            //SWITCH
                            if (self.$containerEl.hasClass('scr-2')) {
                                console.log('>= 768 VIEW TO PREV PANEL');
                                self.$containerEl.removeClass('scr-2');

                                //SCROLL TO TOP
                                if (self.params.autoScrollToTop) {
                                    let pageContent = $('.page-content');
                                    pageContent.scrollTop(0, Math.round(pageContent.scrollTop() / 4));
                                }

                                //DO NOT SKIP TO NEXT PAGE - ONLY CHANGE
                                return true;
                            }
                        }
                    }

                    self.$containerEl.addClass('scr-2');
                }
                
                if (self.questions.hasPrevQuestion()) {
                    let aq = self.questions.prevQuestion();
                    self.updateQuestion(aq);
                } else {
                    self.beforeFirstPage();
                }
            }

            /**
             * On Next Question button click
             * @param e {Event}
             */
            function onNextQuestionClick(e) {
                //e.stopPropagation();
                e.preventDefault();

                if (self.$containerEl) {
                    if (self.params.twoSideOnSmallScreen) {
                        //u malých zařízeních rozděl pohled na hodnocení a detail
                        if ($(window).width() < 768) {
                            //SWITCH
                            if (!self.$containerEl.hasClass('scr-2')) {
                                console.log('>= 768 VIEW TO NEXT PANEL');


                                //FIX PHONE ISSUE - při přechodu na další stránku se mi nezobrazovala správná ikona
                                if (self.params.zhodnoceniImageEl) {
                                    self.$zhodnoceniImageEl.attr('data', '');
                                }

                                //ADD CLASS
                                self.$containerEl.addClass('scr-2');

                                //FIX PHONE ISSUE - při přechodu na další stránku se mi nezobrazovala správná ikona
                                if (self.params.zhodnoceniImageEl) {
                                    let aq = self.questions.actualQuestion();
                                    self.$zhodnoceniImageEl.attr('data', aq.partImage());
                                    //self.updateQuestion(aq);
                                }

                                //SCROLL TO TOP
                                if (self.params.autoScrollToTop) {
                                    let pageContent = $('.page-content');
                                    pageContent.scrollTop(0, Math.round(pageContent.scrollTop() / 4));
                                }

                                //DO NOT SKIP TO NEXT PAGE - ONLY CHANGE
                                return true;
                            }
                        }
                    }

                    self.$containerEl.removeClass('scr-2');
                }

                if (self.questions.hasNextQuestion()) {
                    let aq = self.questions.nextQuestion();
                    self.updateQuestion(aq);
                } else {
                    self.questions.finishTest();
                    self.afterLastPage();
                }
            }

            function onLevelNumberClick(e, levelNumber) {
                e.preventDefault();
                let aq = self.questions.actualQuestion();
                aq.setLevel(levelNumber);
                self.updateChoiceLevel(aq);
            }

            // Events
            utils.extend(self, {
                attachInputEvents() {
                    /*self.$levelNumberZero.on('click', (e) => onLevelNumberClick(e, 0));
                    self.$levelNumberOne.on('click', (e) => onLevelNumberClick(e,1));
                    self.$levelNumberTwo.on('click', (e) => onLevelNumberClick(e,2));
                    self.$levelNumberThree.on('click', (e) => onLevelNumberClick(e,3));
                    self.$levelNumberFour.on('click', (e) => onLevelNumberClick(e,4));
                    self.$levelNumberFive.on('click', (e) => onLevelNumberClick(e,5));*/
                    self.$levelUpEl.on('click', onLevelUpClick);
                    self.$levelDownEl.on('click', onLevelDownClick);
                    self.$prevEl.on('click', onPrevQuestionClick);
                    self.$nextEl.on('click', onNextQuestionClick);
                    self.$saveEl.on('click', onNextQuestionClick);
                },
                detachInputEvents() {
                    /*self.$levelNumberZero.off('click', (e) => onLevelNumberClick(e,0));
                    self.$levelNumberOne.off('click', (e) => onLevelNumberClick(e,1));
                    self.$levelNumberTwo.off('click', (e) => onLevelNumberClick(e,2));
                    self.$levelNumberThree.off('click', (e) => onLevelNumberClick(e,3));
                    self.$levelNumberFour.off('click', (e) => onLevelNumberClick(e,4));
                    self.$levelNumberFive.off('click', (e) => onLevelNumberClick(e,5));*/
                    self.$levelUpEl.off('click', onLevelUpClick);
                    self.$levelDownEl.off('click', onLevelDownClick);
                    self.$prevEl.off('click', onPrevQuestionClick);
                    self.$nextEl.off('click', onNextQuestionClick);
                    self.$saveEl.off('click', onNextQuestionClick);
                },
            });
            self.attachInputEvents();
            //UPDATE
            this.updateQuestion(this.questions.actualQuestion());
            
            self.questions.testStarted();
        }

        destroy() {
            const self = this;

            if (self.destroyed) return;

            self.detachInputEvents();
            utils.deleteProps(self);
            self.destroyed = true;
        }

        /**
         * Update all visual part of item
         * @param aq {ChoiceItem} Actual question item
         * @returns {undefined}
         */
        updateQuestion(aq) {
            const self = this;

            if (!aq) {
                aq = self.questions.actualQuestion();
            }

            if (self.params.updateQuestion) {
                return self.params.updateQuestion.call(self, aq);
            } else {
                if (self.params.titleEl) {
                    self.$titleEl.html(aq.title);
                }

                if (self.params.zhodnoceniImageEl) {
                    self.$zhodnoceniImageEl.attr('data', aq.partImage());
                }

                //SAVE BUTTON ONLY IN LAST
                if (self.params.saveEl) {
                    if (self.questions.hasNextQuestion()) {
                        self.$saveEl.addClass('hidden');
                    } else {
                        self.$saveEl.removeClass('hidden');
                    }
                }

                this.updateChoiceLevel(aq);

                //SCROLL TO TOP
                if (self.params.autoScrollToTop) {
                    let pageContent = $('.page-content');
                    pageContent.scrollTop(0, Math.round(pageContent.scrollTop() / 4));
                }

                const currentQuestionId = self.questions.getActualQuestionIdx();

                for(let i = 0; i < self.questions.items.length; i++) {
                    $(self.$questionNumber + i).removeClass('active');
                }

                $(self.$questionNumber + currentQuestionId).addClass('active');

            }
        }

        /**
         * Update visual part of choice level
         * @param aq {ChoiceItem} Actual question item
         * @returns {undefined}
         */
        updateChoiceLevel(aq) {
            const self = this;
            if (self.params.updateChoiceLevel) {
                return self.params.updateChoiceLevel.call(self, aq);
            } else {
                if (self.params.levelEl) {
                    self.$levelEl.html(aq.getLevel());
                }

                if (self.params.descEl) {
                    self.$descEl.addClass('animate');
                    self.$descEl.html(aq.getLevelHTML());
                    self.$descEl.removeClass('animate');
                }

                if (self.params.levelUpEl) {
                    if (aq.isLastLevel()) {
                        self.$levelUpEl.addClass('disabled');
                    } else {
                        self.$levelUpEl.removeClass('disabled');
                    }
                }

                if (self.params.levelDownEl) {
                    if (aq.isFirstLevel()) {
                        self.$levelDownEl.addClass('disabled');
                    } else {
                        self.$levelDownEl.removeClass('disabled');
                    }
                }

                if (self.params.zhodnoceniTextEl) {
                    self.$zhodnoceniTextEl.html(aq.getZhodnoceniText());
                }

                if (self.params.zhodnoceniLevelInfoEl) {
                    let lidx = '#level_info_' + aq.getLevel();
                    self.$zhodnoceniLevelInfoEl.find('.button').each((idx, el) => {
                        $(idx).removeClass('active');
                    });
                    self.$zhodnoceniLevelInfoEl.find(lidx).each((idx, el) => {
                        $(idx).addClass('active');
                    });
                }

                if (self.params.zhodnoceniImageEl) {
                    if (aq.partObtained()) {
                        self.$zhodnoceniImageEl.addClass('obtained');
                    } else {
                        self.$zhodnoceniImageEl.removeClass('obtained');
                    }
                }

                if (self.params.zhodnoceniDoporuceniEl) {
                    if (aq.partObtained()) {
                        self.$zhodnoceniDoporuceniEl.addClass('hidden');
                    } else {
                        self.$zhodnoceniDoporuceniEl.removeClass('hidden');
                    }
                }
            }
        }

        /**
         * Redirect to URL in params.urlAfterLastPage
         * @returns {undefined|*}
         */
        afterLastPage() {
            const self = this;
            if (self.params.afterLastPage) {
                return self.params.afterLastPage.call(self);
            } else {
                const url = self.params.urlAfterLastPage;
                if (!(url === null || url === '')) {
                    self.app.views.main.router.navigate(url);
                }
            }
        }

        /**
         * Redirect to URL in params.urlBeforeFirstPage
         * @returns {undefined|*}
         */
        beforeFirstPage() {
            const self = this;
            if (self.params.beforeFirstPage) {
                return self.params.beforeFirstPage.call(self);
            } else {
                const url = self.params.urlBeforeFirstPage;
                if (!(url === null || url === '')) {
                    self.app.views.main.router.navigate(url);
                }
            }
        }
    }
}

