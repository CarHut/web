const StateUtil = {
    flattenState: (state) => {
        const flattened = {};
    
        const flatten = (obj, parentKey = '') => {
            for (const key in obj) {
                const newKey = parentKey ? `${parentKey}_${key}` : key;
                if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                    flatten(obj[key], newKey);
                } else if (Array.isArray(obj[key])) {
                    flattened[newKey] = JSON.stringify(obj[key]);
                } else {
                    flattened[newKey] = obj[key];
                }
            }
        };
    
        flatten(state);
        return flattened;
    }
}

export default StateUtil;