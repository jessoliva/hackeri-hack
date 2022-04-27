const { resourceLimits } = require("worker_threads");

module.exports = {
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
            date
        ).getFullYear()}`;
    },

    fix_case: (word) => {
        if (!word) {
            return;
        }
        var sentence = word.toLowerCase().split(" ");
        for (var i = 0; i < sentence.length; i++) {
            sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
        }
        return sentence.join(" ");
    },

    limit_char: (content) => {
        if (content.length > 245) {
            return content.substring(0, 245) + ".....";
        } else {
            return content;
        }
    }   
};
