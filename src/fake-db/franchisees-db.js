import mock from "./mock";
import _ from "lodash";

let franchiseesDb = {
    "IsSuccess": true,
    "MessageCode": 0,
    "Message": null,
    "Data": [
        {
            "ID": 12,
            "Number": "701011",
            "Name": "KMBURNS, LLC",
            "Address": "58 SUMMERDALE ROAD, ANGOLA, NY 14006",
            "Address1": "58 SUMMERDALE ROAD",
            "DistributionAmount": "$117,795.30",
            "Phone": "(716) 465-3461",
            "RegionName": "BUF",
            "StatusName": "Active",
            "IsTemp": 0
        },
        {
            "ID": 14,
            "Number": "701013",
            "Name": "JIM DEVORE \u0026 ASSOCIATES, LLC",
            "Address": "5632 KIES AVENUE, NIAGARA FALLS, NY 14304",
            "Address1": "5632 KIES AVENUE",
            "DistributionAmount": "$8,447.90",
            "Phone": "(716) 264-3908",
            "RegionName": "BUF",
            "StatusName": "Active",
            "IsTemp": 0
        },
        {
            "ID": 20,
            "Number": "701019",
            "Name": "THE REGNET ENTERPRISE, LLC",
            "Address": "7 SIBLEY STREET, APT. 2, BUFFALO, NY 14220",
            "Address1": "7 SIBLEY STREET, APT. 2",
            "DistributionAmount": "$12,807.22",
            "Phone": "(716) 220-0135",
            "RegionName": "BUF",
            "StatusName": "Active",
            "IsTemp": 0
        },
        {
            "ID": 20,
            "Number": "701019",
            "Name": "THE REGNET ENTERPRISE, LLC",
            "Address": "7 SIBLEY STREET, APT. 2, BUFFALO, NY 14220",
            "Address1": "7 SIBLEY STREET, APT. 2",
            "DistributionAmount": "$12,807.22",
            "Phone": "(716) 220-0135",
            "RegionName": "BUF",
            "StatusName": "Active",
            "IsTemp": 0
        },
        {
            "ID": 37,
            "Number": "701036",
            "Name": "Alesia H. Brown \u0026 Maurice D. Brown Associates, LLC",
            "Address": "28 Eggert Road, Cheektowaga, NY 14215",
            "Address1": "28 Eggert Road",
            "DistributionAmount": "$0.00",
            "Phone": "(716) 844-8038",
            "RegionName": "BUF",
            "StatusName": "Active",
            "IsTemp": 0
        },
        {
            "ID": 49,
            "Number": "701048",
            "Name": "JOSEPH T. SWARTZMEYER",
            "Address": "105 GROTE STREET, BUFFALO, NY 14207",
            "Address1": "105 GROTE STREET",
            "DistributionAmount": "$1,136.99",
            "Phone": "(716) 715-8046",
            "RegionName": "BUF",
            "StatusName": "Active",
            "IsTemp": 0
        },
        {
            "ID": 60,
            "Number": "701059",
            "Name": "BOB J. GATES",
            "Address": "12 HERTEL AVENUE, APT. 606, BUFFALO, NY 14207",
            "Address1": "12 HERTEL AVENUE, APT. 606",
            "DistributionAmount": "$2,590.77",
            "Phone": "(716) 603-3907",
            "RegionName": "BUF",
            "StatusName": "Active",
            "IsTemp": 0
        },
        {
            "ID": 61,
            "Number": "701060",
            "Name": "HUNTER \u0026 WHITE, LLC",
            "Address": "130 MAYER AVENUE, BUFFALO, NY 14207",
            "Address1": "130 MAYER AVENUE",
            "DistributionAmount": "$0.00",
            "Phone": "(716) 342-4846",
            "RegionName": "BUF",
            "StatusName": "Active",
            "IsTemp": 0
        },
        {
            "ID": 67,
            "Number": "701066",
            "Name": "TANYA SOLER",
            "Address": "35 WALTER STREET, BUFFALO, NY 14215",
            "Address1": "35 WALTER STREET",
            "DistributionAmount": "$3,398.11",
            "Phone": "(716) 430-1284",
            "RegionName": "BUF",
            "StatusName": "Active",
            "IsTemp": 0
        },
        {
            "ID": 73,
            "Number": "701072",
            "Name": "ANDREW GERACE",
            "Address": "202 MAURICE STREET, BUFFALO, NY 14210",
            "Address1": "202 MAURICE STREET",
            "DistributionAmount": "$101,908.72",
            "Phone": "(716) 824-0103",
            "RegionName": "BUF",
            "StatusName": "Active",
            "IsTemp": 0
        },
        {
            "ID": 75,
            "Number": "701074",
            "Name": "ROMEO SANTIANO",
            "Address": "53 GRAND PRIX, CHEEKTOWAGA, NY 14227",
            "Address1": "53 GRAND PRIX",
            "DistributionAmount": "$2,326.49",
            "Phone": "(716) 656-0208",
            "RegionName": "BUF",
            "StatusName": "Active",
            "IsTemp": 0
        },
        {
            "ID": 80,
            "Number": "701079",
            "Name": "JAMES GREEN \u0026 GEORGE MCGEE",
            "Address": "188 LOCUST STREET, BUFFALO, NY 14204",
            "Address1": "188 LOCUST STREET",
            "DistributionAmount": "$0.00",
            "Phone": "(716) 308-7962",
            "RegionName": "BUF",
            "StatusName": "Active",
            "IsTemp": 0
        },
        {
            "ID": 84,
            "Number": "701083",
            "Name": "JOE KOWALSKI dba JAKS",
            "Address": "46 MICHELE DRIVE, DEPEW, NY 14043",
            "Address1": "46 MICHELE DRIVE",
            "DistributionAmount": "$21,534.03",
            "Phone": "(716) 656-0267",
            "RegionName": "BUF",
            "StatusName": "Active",
            "IsTemp": 0
        },
        {
            "ID": 85,
            "Number": "701084",
            "Name": "BAJRO HADZIC",
            "Address": "90 ROHR STREET UPPER, BUFFALO, NY 14211",
            "Address1": "90 ROHR STREET UPPER",
            "DistributionAmount": "$1,034.83",
            "Phone": "(716) 877-8264",
            "RegionName": "BUF",
            "StatusName": "Active",
            "IsTemp": 0
        },
        {
            "ID": 86,
            "Number": "701085",
            "Name": "CRYSTAL FORD",
            "Address": "462 HILL ROAD, HILTON, NY 14468",
            "Address1": "462 HILL ROAD",
            "DistributionAmount": "$2,933.16",
            "Phone": "(585) 313-9754",
            "RegionName": "BUF",
            "StatusName": "Active",
            "IsTemp": 0
        },
        {
            "ID": 89,
            "Number": "701088",
            "Name": "CONNOR \u0026 SON, LLC",
            "Address": "309 CENTRAL AVENUE, APT. 4, LANCASTER, NY 14086",
            "Address1": "309 CENTRAL AVENUE, APT. 4",
            "DistributionAmount": "$8,255.92",
            "Phone": "(716) 536-7077",
            "RegionName": "BUF",
            "StatusName": "Active",
            "IsTemp": 0
        },
        {
            "ID": 93,
            "Number": "701092",
            "Name": "BASMAR CORPORATION",
            "Address": "1543 ERIE AVENUE, NORTH TONAWANDA, NY 14120",
            "Address1": "1543 ERIE AVENUE",
            "DistributionAmount": "$1,309.98",
            "Phone": "(716) 695-0570",
            "RegionName": "BUF",
            "StatusName": "Active",
            "IsTemp": 0
        },
        {
            "ID": 95,
            "Number": "701094",
            "Name": "JOHNNY ROBINSON",
            "Address": "4331 OAKWOOD AVENUE, BLASDELL, NY 14219",
            "Address1": "4331 OAKWOOD AVENUE",
            "DistributionAmount": "$10,214.12",
            "Phone": "(716) 536-6338",
            "RegionName": "BUF",
            "StatusName": "Active",
            "IsTemp": 0
        },
        {
            "ID": 96,
            "Number": "701095",
            "Name": "SAMO ENTERPRISES, LLC",
            "Address": "1150 BAILEY AVENUE, BUFFALO, NY 14206",
            "Address1": "1150 BAILEY AVENUE",
            "DistributionAmount": "$0.00",
            "Phone": "(716) 440-3474",
            "RegionName": "BUF",
            "StatusName": "Active",
            "IsTemp": 0
        },
        {
            "ID": 97,
            "Number": "701096",
            "Name": "GRANDNUBIAN, LLC",
            "Address": "65 FORMAN STREET, BUFFALO, NY 14211",
            "Address1": "65 FORMAN STREET",
            "DistributionAmount": "$0.00",
            "Phone": "(716) 310-4398",
            "RegionName": "BUF",
            "StatusName": "Active",
            "IsTemp": 0
        },
        {
            "ID": 102,
            "Number": "701101",
            "Name": "WILLIAM BROWN, JR.",
            "Address": "1119 SYCAMORE, BUFFALO, NY 14212",
            "Address1": "1119 SYCAMORE",
            "DistributionAmount": "$303.25",
            "Phone": "(716) 897-3402",
            "RegionName": "BUF",
            "StatusName": "Active",
            "IsTemp": 0
        },
        {
            "ID": 103,
            "Number": "701102",
            "Name": "RONALD GARDNER",
            "Address": "84 MAPLE ROAD, BUFFALO, NY 14215",
            "Address1": "84 MAPLE ROAD",
            "DistributionAmount": "$0.00",
            "Phone": "(716) 812-6208",
            "RegionName": "BUF",
            "StatusName": "Active",
            "IsTemp": 0
        },
        {
            "ID": 104,
            "Number": "701103",
            "Name": "TAINE S. NOWAK",
            "Address": "11090 LYNDALE LANE, ELMA, NY 14059",
            "Address1": "11090 LYNDALE LANE",
            "DistributionAmount": "$3,645.57",
            "Phone": "(716) 714-9017",
            "RegionName": "BUF",
            "StatusName": "Active",
            "IsTemp": 0
        },
        {
            "ID": 107,
            "Number": "701106",
            "Name": "JACKSON 4 JACKSON, INC.",
            "Address": "124 GERALD AVENUE, BUFFALO, NY 14215",
            "Address1": "124 GERALD AVENUE",
            "DistributionAmount": "$72,081.93",
            "Phone": "(716) 704-6161",
            "RegionName": "BUF",
            "StatusName": "Active",
            "IsTemp": 0
        },
        {
            "ID": 108,
            "Number": "701107",
            "Name": "ANITA ALVORD D/B/A AMA ENT.",
            "Address": "6326 CAMPBELL BOULEVARD, PENDLETON, NY 14094",
            "Address1": "6326 CAMPBELL BOULEVARD",
            "DistributionAmount": "$40,124.85",
            "Phone": "(716) 998-8950",
            "RegionName": "BUF",
            "StatusName": "Active",
            "IsTemp": 0
        },
        {
            "ID": 111,
            "Number": "701110",
            "Name": "LEHMAN CORP.",
            "Address": "11 VIEW COURT, DEPEW, NY 14043",
            "Address1": "11 VIEW COURT",
            "DistributionAmount": "$6,236.82",
            "Phone": "(716) 668-1123",
            "RegionName": "BUF",
            "StatusName": "Active",
            "IsTemp": 0
        },
        {
            "ID": 112,
            "Number": "701111",
            "Name": "PRYOR \u0026 PRYOR, INC.",
            "Address": "227 STOCKBRIDGE AVENUE, BUFFALO, NY 14215",
            "Address1": "227 STOCKBRIDGE AVENUE",
            "DistributionAmount": "$0.00",
            "Phone": "(716) 931-0491",
            "RegionName": "BUF",
            "StatusName": "Active",
            "IsTemp": 0
        },
        {
            "ID": 114,
            "Number": "701113",
            "Name": "GOLD JACKET 240, LLC",
            "Address": "500 SENECA STREET, UNIT 3-7, BUFFALO, NY 14204",
            "Address1": "500 SENECA STREET, UNIT 3-7",
            "DistributionAmount": "$3,326.05",
            "Phone": "(716) 939-2221",
            "RegionName": "BUF",
            "StatusName": "Active",
            "IsTemp": 0
        },
        {
            "ID": 115,
            "Number": "701114",
            "Name": "SCED LAND CO., LLC",
            "Address": "12837 ROUTE 438, IRVING, NY 14081",
            "Address1": "12837 ROUTE 438",
            "DistributionAmount": "$0.00",
            "Phone": "(716) 332-7660",
            "RegionName": "BUF",
            "StatusName": "Active",
            "IsTemp": 0
        },
        {
            "ID": 116,
            "Number": "701115",
            "Name": "RASOOLI, LLC",
            "Address": "2193 NORTH FRENCH ROAD, APT. 1, GETZVILLE, NY 14068",
            "Address1": "2193 NORTH FRENCH ROAD, APT. 1",
            "DistributionAmount": "$4,067.03",
            "Phone": "(716) 322-8466",
            "RegionName": "BUF",
            "StatusName": "Active",
            "IsTemp": 0
        },
        {
            "ID": 117,
            "Number": "701116",
            "Name": "ABATIS, LLC",
            "Address": "72 STUTZMAN ROAD, BOWMANSVILLE, NY 14026",
            "Address1": "72 STUTZMAN ROAD",
            "DistributionAmount": "$0.00",
            "Phone": "(716) 206-2322",
            "RegionName": "BUF",
            "StatusName": "Active",
            "IsTemp": 0
        },
        {
            "ID": 118,
            "Number": "701ZZ9",
            "Name": "JANI KING BUFFALO-IN HOUSE",
            "Address": "270 NORTHPOINTE PARKWAY #200, AMHERST, NY 14228",
            "Address1": "270 NORTHPOINTE PARKWAY #200",
            "DistributionAmount": "$0.00",
            "Phone": "(716) 636-4840",
            "RegionName": "BUF",
            "StatusName": "Active",
            "IsTemp": 0
        },
        {
            "ID": 119,
            "Number": "701ZZA",
            "Name": "JANI-KING OF BUFFALO SUPPLIES",
            "Address": "270 NORTHPOINTE PKWY. #200, AMHERST, NY 14228",
            "Address1": "270 NORTHPOINTE PKWY. #200",
            "DistributionAmount": "$0.00",
            "Phone": "",
            "RegionName": "BUF",
            "StatusName": "Active",
            "IsTemp": 0
        },
        {
            "ID": 120,
            "Number": "701ZZB",
            "Name": "JANI-KING BUFFALO - BILLS",
            "Address": "270 NORTHPOINTE PARKWAY, AMHERST, NY 14228",
            "Address1": "270 NORTHPOINTE PARKWAY",
            "DistributionAmount": "$0.00",
            "Phone": "(716) 636-4840",
            "RegionName": "BUF",
            "StatusName": "Active",
            "IsTemp": 0
        },
        {
            "ID": 121,
            "Number": "701ZZC",
            "Name": "JANI-KING BUFFALO-LIVE NATION",
            "Address": "270 NORTHPOINTE PARKWAY, AMHERST, NY 14228",
            "Address1": "270 NORTHPOINTE PARKWAY",
            "DistributionAmount": "$0.00",
            "Phone": "(716) 636-4840",
            "RegionName": "BUF",
            "StatusName": "Active",
            "IsTemp": 0
        }
    ]
}

/**
 * Read DB
 */
mock.onGet("/api/franchisees/gets").reply(() => {
    return [200, franchiseesDb];
});

/**
 * Add new DB
 */
mock.onPost("/api/franchisees/save").reply(request => {
    const data = JSON.parse(request.data);
    let franchisees = null;

    franchiseesDb = franchiseesDb.map(_franchisees => {
        if (_franchisees.id === data.id) {
            franchisees = data;
            return franchisees;
        }
        return _franchisees;
    });

    if (!franchisees) {
        franchisees = data;
        franchiseesDb = [...franchiseesDb, franchisees];
    }

    return [200, franchisees];
});

/**
 *  Update a Openinghours
 */
mock.onPost("/api/franchisees/update").reply(request => {
    const data = JSON.parse(request.data);
    let franchisees = data.franchisees;
    let update = data.data;
    franchisees = franchisees.map(_franchisees => {
        if (_franchisees.id === data.id) {
            return _.merge(_franchisees, update);
        }
        return _franchisees;
    });

    return [200, franchisees];
});

/**
 *  Delete a invoice
 */
mock.onPost("/api/franchisees/delete").reply(req => {
    let data = JSON.parse(req.data);
    let franchisees = data.franchisees;
    _.forEach(data.ids, function(id){
        let deleted = _.remove(franchisees.Data, function(_franchisees) {
            // console.log('invoice', _invoice);
            return _franchisees.ID===id
        });
    });

    return [200, franchisees];
});


mock.onPost('/api/franchisees/remove').reply((req) => {
    let data = JSON.parse(req.data);
    console.log('id=', data.franchisees);
    let franchisees = data.franchisees;
    let deleted = _.remove(franchisees.Data, function(_franchisees) {
        return _franchisees.ID === data.id;
    });

    return [200, franchisees];
});

mock.onGet("/api/franchisees/get").reply(request => {
    const { editId } = request.params;
    const response = _.find(franchiseesDb, { id: editId });
    return [200, response];
});

