import Cache from './storeCache.js';

/**
 * Represents all steps in progress section
 */
class Steps {
    constructor() {
        this.db_item_name = 'sc_progress_total_steps';
        this.cache = new Cache('steps');
        this.totalSteps = this.loadTotalSteps();
    }

    getSteps(minimumSteps) {
        let steps = [];

        for (let i = 0; i < minimumSteps; i++) {
            steps[i] = {};
        }

        for (let i = 0; i <= this.totalSteps; i++) {
            const temp = new Step(i);
            steps[i] = temp.step;
        }
        return steps;
    }

    getStepsByStatus({finished = false, maxSteps = 3}) {
        let steps = [];

        for (let i = 0; i <= this.totalSteps; i++) {
            const temp = new Step(i);
            
            if (!finished && 
                (typeof temp.step.done === 'undefined' || !temp.step.done) && 
                (typeof temp.step.title !== 'undefined' && temp.step.title !== '')) {
                steps.push(temp.step);
                
            } else if (finished && 
                (typeof temp.step.done !== 'undefined' && temp.step.done)) {
                steps.push(temp.step);
            }
            if(steps.length === maxSteps) break;
        }
        
        return steps;
    }

    getStepCount() {
        return (this.totalSteps + 1);
    }

    /**
     * Add, edit or get a step
     * @param {int} order 
     * @param {string} title 
     * @param {int} date 
     * @param {bool} done 
     * @param {string} needs 
     * @param {string} help 
     * @returns 
     */
    step({order, title = '', date = -1, done = -1, needs = '', help = ''}) {
        if (order > (this.totalSteps + 1)) throw 'Number of step cannot be bigger than total number of steps + 1';

        let s = new Step(order);

        if (title !== '') s.setTitle(title);
        if (date !== -1) s.setDate(date);
        if (done !== -1) s.setDone(done);
        if (needs !== '') s.setNeeds(needs);
        if (help !== '') s.setHelp(help);
        if (order > this.totalSteps) this.setTotalSteps();

        s.save();
        return s.step;
    }

    changeOrder(indexes) {
        let steps = [];
        let from = indexes['from'];
        let to = indexes['to'];

        for (let i = 0; i <= this.totalSteps; i++) {
            const temp = new Step(i);
            steps[i] = temp;
        }

        const newStep = steps[from];
        let newOrderedArr;

        if (from > to) {
            newOrderedArr = steps.slice(to, from);
            [from, to] = [to, from];
            newOrderedArr.unshift(newStep);
        } else {
            newOrderedArr = steps.slice(from + 1, to + 1);
            newOrderedArr.push(newStep);
        }

        const firstArr = steps.slice(0, from);
        const secondArr = steps.slice(to + 1);
        steps = firstArr.concat(newOrderedArr).concat(secondArr);

        steps.forEach((step, index) => {
            step.order = index;
            step.step.order = index;
            step.save();
        });
    }

    remove(order) {
        let s = new Step(order);
        s.remove();
        if (order < this.totalSteps) {
            for (let i = (order + 1); i <= this.totalSteps; i++) {
                s = new Step(i);
                s.setOrder(i - 1);
            }
        }

        this.setTotalSteps(this.totalSteps - 1);
    }

    setTotalSteps(count = null) {
        count = count === null ? (++this.totalSteps) : count;
        this.totalSteps = count;
        this.saveTotalSteps();
    }

    saveTotalSteps() {
        try {
            this.cache.set(this.db_item_name, this.totalSteps);
        } catch (e) {
            console.log('E62455: ', e.message);
        }
    }

    loadTotalSteps() {
        let count = -1;

        if (this.cache && this.db_item_name) {
            try {
                count = this.cache.get(this.db_item_name);
                if (count === 0) {
                    let temp = new Step(0);
                    if (temp.step.title === '') {
                        count = -1;
                    }
                }
            } catch (e) {
                console.log('E62456: ', e.message);
            }
        }
        return parseInt(count);
    }
}

/**
 * Represents a single step in progress section
 * @constructor
 */
class Step {
    constructor(order) {
        this.order = order;
        this.db_item_name = `sc_progress_step`;
        this.cache = new Cache('step');
        this.step = this.get();
        this.step.order = order;
    }

    /**
     * Set the title of the current step
     * @param {string} title
     */
    setTitle(title) {
        this.step.title = title;
    }

    /**
     * Set the order of current step
     * @param {int} date
     */
    setDate(date) {
        this.step.date = date;
    }

    /**
     * Set the order of current step
     * @param {date} done
     */
    setDone(done) {
        this.step.done = done;
    }

    /**
     * Set the order of current step
     * @param {string} needs
     */
    setNeeds(needs) {
        this.step.needs = needs;
    }

    /**
     * Set the order of current step
     * @param {string} help
     */
    setHelp(help) {
        this.step.help = help;
    }

    /**
     * Set the order of the current step
     * @param {int} newOrder
     */
    setOrder(newOrder) {
        const tempStep = this.step;
        this.remove();
        this.order = newOrder;
        this.step = tempStep;
        this.step.order = newOrder;
        this.save();
    }

    /**
     * Saves the current step to DB
     * */
    save() {
        try {
            const item_name = this.db_item_name + `_${this.order}`;
            this.cache.set(item_name, JSON.stringify(this.step));
        } catch (e) {
            console.log('E62455: ', e.message);
        }
    }

    /**
     * Get the step from DB
     * @returns {string}
     * */
    get() {
        let step = {};

        if (this.cache && this.db_item_name) {
            const item_name = this.db_item_name + `_${this.order}`;
            try {
                const temp = this.cache.get(item_name);
                if (temp !== 0) step = JSON.parse(temp);
            } catch (e) {
                console.log('E62456: ', e.message);
            }
        }
        return step;
    }

    /**
     * Delete the current step from DB
     * */
    remove() {
        const item_name = this.db_item_name + `_${this.order}`;
        this.step = {};
        this.cache.remove(item_name);
    }
}

export default Steps;