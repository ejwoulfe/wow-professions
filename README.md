# World of Warcraft Professions

## Usage

All responses will be in json.

### List all professions

**Definition**

'Get /professions'

**Response**

- '200 OK'

    json:
    [
        {
            "identifier": "alchemy",
            "name": "Alchemy"
        },
        {
            "identifier": "leatherworking",
            "name": "Leatherworking"
        },
        {
            "identifier": "blacksmithing",
            "name": "Blacksmithing"
        },
        {
            "identifier": "tailoring",
            "name": "Tailoring"
        }
    ]

## Lookup profession

'GET /profession/<identifier>'

**Response**

- '404 Not Found' if the profession doesn't exist
- '200 OK' on success

    json:
    {
        "identifier": "Alchemy",
        "name": "Alchemy",
        "recipes": [
            {
                "name": "Superior Battle Potion of Intellect",
                "icon": "trade_alchemy_potione2",
                "materials": [
                    {
                        "name": "Zin'thanid",
                        "icon": "herb_icon",
                        "quantity": 8
                    }
                ]
            },
            {
                "name": "Superior Battle Potion of Agility",
                "icon": "trade_alchemy_potione3",
                "materials": [
                    {
                        "name": "Zin'thanid",
                        "icon": "herb_icon",
                        "quantity": 8
                    },
                    {
                        "name": "Riverbud",
                        "icon": "herb_icon2",
                        "quantity": 3
                    }
                ]
            }
        ]
    }
