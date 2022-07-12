const makeRules = (rules: string) => {
    const rulesArray = rules.split('|');
    let rls: string = '';

    for (let i = 0; i < rulesArray.length; i++) {
        let rule = rulesArray[i].split('/landing')[0];
        let ruleValue = rulesArray[i].split('/landing')[1];

        switch (rule) {
            case 'r':
                rls += 'required|';
                break;
            case 'an':
                rls += 'alpha_numeric|';
                break;
            case 'a':
                rls += 'alpha|';
                break;
            case 'e':
                rls += 'email|';
                break;
            case 'mn':
                rls += 'min:' + ruleValue + '|';
                break;
            case 'mx':
                rls += 'max:' + ruleValue + '|';
                break;
            case 's':
                rls += 'string|';
                break;
            case 'b':
                rls += 'boolean|';
                break;
            default:
                break;
        }
    }
    rls = rls.substring(0, rls.length - 1);
    return rls;
};

const MakeRules = (rules: string[]) => {
    let n_rules: { [key: string]: any } = {};

    for (let i = 0; i < rules.length; i++) {
        let key = rules[i].split(':')[0];
        let rls = makeRules(rules[i].split(':')[1]);
        n_rules[key] = rls;
    }
    return n_rules;
};

export default MakeRules;
