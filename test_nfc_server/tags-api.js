var express = require('express'),
    router = express.Router();

var groups = new Array({ name: 'group1', service: 'geolocation' }, { name: 'group2', service: 'messaging' });


var GROUPS_CACHE = [];


router.post('/auth', (req, res) => {
    tagInfo = {
        id: [1, 1, 1],
        groups: [
            {
                name: "praca",
                pluginName: "geolocation",
                adminId: [1, 1, 1]
            },
            {
                name: "wydzial",
                pluginName: "geolocation",
                adminId: [2, 2, 2]
            },
            {
                name: "grupa T1",
                pluginName: "messaging",
                adminId: [1, 1, 1]
            }
        ],
        token: "abc"
    };

    res.status(200).json(tagInfo);
});

router.get('/groups/praca/content', (req, res) => {
    res.status(200).json(
        {
            "url": "https://www.google.pl/maps/place/Wydzia%C5%82+Elektroniki+i+Technik+Informacyjnych,+Politechnika+Warszawska/@52.2187823,21.006573,16z/data=!4m5!3m4!1s0x471ecce91dd158b3:0x188bc853d7b6b561!8m2!3d52.2191568!4d21.0112077"
        }
    );
});

router.post('/groups', (req, res) => {
    var response = {
        group: {
            name: "rodzina",
            pluginName: "geolocation",
            adminId: [1,1,1]
        }
    };

    res.status(200).json(response);
});

router.get('/groups/praca/content', (req, res) => {
    res.status(200).json(
        {
            "url": "https://www.google.pl/maps/place/Wydzia%C5%82+Elektroniki+i+Technik+Informacyjnych,+Politechnika+Warszawska/@52.2187823,21.006573,16z/data=!4m5!3m4!1s0x471ecce91dd158b3:0x188bc853d7b6b561!8m2!3d52.2191568!4d21.0112077"
        }
    );

});


module.exports = router;