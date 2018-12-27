import mock from "./mock";
import _ from "lodash";

let franchiseesDb = {
    "IsSuccess": true,
    "MessageCode": 200,
    "Message": "Here is the data you requested",
    "Data": {
        "Region": [
            {
                "Id": 2,
                "Code": "BUF",
                "Name": "Buffalo",
                "LegalName": "Jani-King of Buffalo, Inc.",
                "Francisees": [
                    {
                        "ID": 12,
                        "Number": "701011",
                        "Name": "KMBURNS, LLC",
                        "Address": "58 SUMMERDALE ROAD, ANGOLA, NY 14006",
                        "Address1": "58 SUMMERDALE ROAD",
                        "DistributionAmount": "$117,795.30",
                        "Phone": "(716) 465-3461",
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
                        "StatusName": "Active",
                        "IsTemp": 0
                    }
                ]
            },
            {
                "Id": 24,
                "Code": "PHI",
                "Name": "Philadelphia",
                "LegalName": "Jani-King of Philadelphia, Inc.",
                "Franchisees": [
                    {
                        "ID": 5582,
                        "Number": "311012",
                        "Name": "GEORGIA MUMFORD",
                        "Address": "441 EAST SLOCUM STREET, PHILADELPHIA, PA 19119",
                        "Address1": "441 EAST SLOCUM STREET",
                        "DistributionAmount": "$2,172.00",
                        "Phone": "(215) 768-5229",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5606,
                        "Number": "311036",
                        "Name": "WILLIAM J. HENLEY",
                        "Address": "2646 NORTH 5TH STREET, HARRISBURG, PA 17110",
                        "Address1": "2646 NORTH 5TH STREET",
                        "DistributionAmount": "$0.00",
                        "Phone": "(717) 307-5997",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5621,
                        "Number": "311051",
                        "Name": "JEANNIE, INC.",
                        "Address": "6313 TORRESDALE AVNUE, PHILADELPHIA, PA 19135",
                        "Address1": "6313 TORRESDALE AVNUE",
                        "DistributionAmount": "$903.50",
                        "Phone": "(215) 870-4153",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5636,
                        "Number": "311066",
                        "Name": "STEVE W. NEDRICK",
                        "Address": "1711 MONTEREY DRIVE, PLYMOUTH MEETING, PA 19462",
                        "Address1": "1711 MONTEREY DRIVE",
                        "DistributionAmount": "$0.00",
                        "Phone": "(610) 272-4118",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5641,
                        "Number": "311071",
                        "Name": "UN HO ENTERPRISE, LLC",
                        "Address": "2755 STACIE DRIVE, GILBERTSVILLE, PA 19525",
                        "Address1": "2755 STACIE DRIVE",
                        "DistributionAmount": "$89,908.58",
                        "Phone": "(267) 549-5159",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5644,
                        "Number": "311074",
                        "Name": "WILLIAM J. MANN",
                        "Address": "1003 CHERRYWOOD APARTMENTS, CLEMENTON, NJ 08021",
                        "Address1": "1003 CHERRYWOOD APARTMENTS",
                        "DistributionAmount": "$10,298.01",
                        "Phone": "(609) 774-7777",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5645,
                        "Number": "311075",
                        "Name": "CYNTHIA LOMBARDO",
                        "Address": "148 BISHOPS DRIVE, ASTON, PA 19014",
                        "Address1": "148 BISHOPS DRIVE",
                        "DistributionAmount": "$550.17",
                        "Phone": "(610) 459-0970",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5655,
                        "Number": "311085",
                        "Name": "LANARD LEWIS ENTERPRISE, LLC",
                        "Address": "323 SHADY LANE, MARLTON, NJ 08053",
                        "Address1": "323 SHADY LANE",
                        "DistributionAmount": "$3,971.36",
                        "Phone": "(609) 510-1615",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5689,
                        "Number": "311119",
                        "Name": "SHINEBRITE, LLC",
                        "Address": "501 FAIRHURST ROAD, FAIRLESS HILLS, PA 19030",
                        "Address1": "501 FAIRHURST ROAD",
                        "DistributionAmount": "$1,586.60",
                        "Phone": "(609) 668-7446",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5690,
                        "Number": "311120",
                        "Name": "DTGXX ENTERPRISES, LLC",
                        "Address": "6531 NORTH 10TH STREET, PHILADELPHIA, PA 19126",
                        "Address1": "6531 NORTH 10TH STREET",
                        "DistributionAmount": "$1,309.00",
                        "Phone": "(215) 498-4096",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5704,
                        "Number": "311134",
                        "Name": "SSELTNER ENTERPRISE, LLC",
                        "Address": "528 HARRISON STREET, RIVERSIDE, NJ 08075",
                        "Address1": "528 HARRISON STREET",
                        "DistributionAmount": "$884.66",
                        "Phone": "(609) 680-2121",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5709,
                        "Number": "311139",
                        "Name": "VEGA ENTERPRISES, LLC",
                        "Address": "8 CHARLOTTE AVENUE, GLASSBORO, NJ 08028",
                        "Address1": "8 CHARLOTTE AVENUE",
                        "DistributionAmount": "$210.00",
                        "Phone": "(856) 504-8746",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5725,
                        "Number": "311155",
                        "Name": "ADAMS BUNCH, LLC",
                        "Address": "2278 KLOCKNER ROAD, HAMILTON SQUARE, NJ 08690",
                        "Address1": "2278 KLOCKNER ROAD",
                        "DistributionAmount": "$3,953.40",
                        "Phone": "(609) 890-4069",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5726,
                        "Number": "311156",
                        "Name": "ALTON DIAS",
                        "Address": "3519 RYAN AVENUE, PHILADELPHIA, PA 19136",
                        "Address1": "3519 RYAN AVENUE",
                        "DistributionAmount": "$2,593.15",
                        "Phone": "(215) 335-6786",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5732,
                        "Number": "311162",
                        "Name": "ERIC GILLIAM",
                        "Address": "515 WELSH ROAD, D-3, HUNTINGDON VALLEY, PA 19006",
                        "Address1": "515 WELSH ROAD, D-3",
                        "DistributionAmount": "$6,264.81",
                        "Phone": "(215) 300-8550",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5734,
                        "Number": "311164",
                        "Name": "WILLIAM M. BURNS, JR.",
                        "Address": "410 9TH STREET, NEW CASTLE, DE 19720",
                        "Address1": "410 9TH STREET",
                        "DistributionAmount": "$3,614.88",
                        "Phone": "(302) 658-6986",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5740,
                        "Number": "311170",
                        "Name": "JAMES A. JORDAN",
                        "Address": "5369 THOMAS AVENUE, PHILADELPHIA, PA 19143",
                        "Address1": "5369 THOMAS AVENUE",
                        "DistributionAmount": "$22,351.19",
                        "Phone": "(215) 749-0060",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5745,
                        "Number": "311175",
                        "Name": "DENNIS TOOMER",
                        "Address": "925 DUNCAN AVENUE, YEADON, PA 19050",
                        "Address1": "925 DUNCAN AVENUE",
                        "DistributionAmount": "$5,182.11",
                        "Phone": "(610) 496-5207",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5762,
                        "Number": "311192",
                        "Name": "PASQUALE ENTERPRISES, LLC",
                        "Address": "1334 EAST RITTENHOUSE STREET, PHILADELPHIA, PA 19138",
                        "Address1": "1334 EAST RITTENHOUSE STREET",
                        "DistributionAmount": "$10,403.56",
                        "Phone": "(484) 318-1609",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5769,
                        "Number": "311199",
                        "Name": "JEFFERY W. ZAHN",
                        "Address": "75 MACFARLAND AVENUE, WARMINISTER, PA 18974-1263",
                        "Address1": "75 MACFARLAND AVENUE",
                        "DistributionAmount": "$490.87",
                        "Phone": "(215) 669-8416",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5774,
                        "Number": "311204",
                        "Name": "DIMEDIO UNLIMITED, LLC",
                        "Address": "136 JOAN DRIVE, TRAPPE, PA 19426",
                        "Address1": "136 JOAN DRIVE",
                        "DistributionAmount": "$1,743.42",
                        "Phone": "(610) 409-0418",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5788,
                        "Number": "311218",
                        "Name": "DAN LAM",
                        "Address": "1816 NAPFLE AVENUE, PHILADELPHIA, PA 19111",
                        "Address1": "1816 NAPFLE AVENUE",
                        "DistributionAmount": "$9,352.82",
                        "Phone": "(215) 706-0358",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5798,
                        "Number": "311228",
                        "Name": "KASIM Y. SUED",
                        "Address": "2500 KNIGHTS ROAD #64-06, BENSALEM, PA 19020",
                        "Address1": "2500 KNIGHTS ROAD #64-06",
                        "DistributionAmount": "$1,273.81",
                        "Phone": "(215) 307-2850",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5799,
                        "Number": "311229",
                        "Name": "JM Helping Hands, LLC",
                        "Address": "955 KATIE CIRCLE, ROYERSFORD, PA 19468",
                        "Address1": "955 KATIE CIRCLE",
                        "DistributionAmount": "$1,165.00",
                        "Phone": "(484) 744-3336",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5800,
                        "Number": "311230",
                        "Name": "TRUMAN ENTERPRISES, LLC",
                        "Address": "1712 SOUTH CHADWICK STREET, PHILADELPHIA, PA 19145",
                        "Address1": "1712 SOUTH CHADWICK STREET",
                        "DistributionAmount": "$3,346.00",
                        "Phone": "(215) 667-3581",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5802,
                        "Number": "311232",
                        "Name": "BRITTINGHAM ENTERPRISE, LLC",
                        "Address": "4727 VISTA STREET, PHILADELPHIA, PA 19136",
                        "Address1": "4727 VISTA STREET",
                        "DistributionAmount": "$9,048.75",
                        "Phone": "(267) 648-6435",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5822,
                        "Number": "311252",
                        "Name": "TONY TRAM",
                        "Address": "2844 SOUTH RANDOLPH STREET, PHILADELPHIA, PA 19148",
                        "Address1": "2844 SOUTH RANDOLPH STREET",
                        "DistributionAmount": "$1,183.79",
                        "Phone": "(610) 803-5216",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5826,
                        "Number": "311256",
                        "Name": "BILLY M. HUNT",
                        "Address": "1301 AINO LANE, VINELAND, NJ 08360",
                        "Address1": "1301 AINO LANE",
                        "DistributionAmount": "$317.00",
                        "Phone": "(856) 507-1878",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5831,
                        "Number": "311261",
                        "Name": "BRIAN FULLER",
                        "Address": "376 SUMMERFIELD CIRCLE, HORSHAM, PA 19002",
                        "Address1": "376 SUMMERFIELD CIRCLE",
                        "DistributionAmount": "$2,037.10",
                        "Phone": "(215) 694-5526",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5834,
                        "Number": "311264",
                        "Name": "KINGDOM WORKERS, LLC",
                        "Address": "21 PATRICIA LANE, SICKLERVILLE, NJ 08081",
                        "Address1": "21 PATRICIA LANE",
                        "DistributionAmount": "$2,429.39",
                        "Phone": "(856) 449-9479",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5835,
                        "Number": "311265",
                        "Name": "HIEN K. HUYNH",
                        "Address": "1934 LARDNER STREET, PHILADELPHIA, PA 19149",
                        "Address1": "1934 LARDNER STREET",
                        "DistributionAmount": "$3,680.00",
                        "Phone": "(267) 879-4794",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5837,
                        "Number": "311267",
                        "Name": "YIBEGETA Y. KERO",
                        "Address": "265 GREENLAND DRIVE, LANCASTER, PA 17602",
                        "Address1": "265 GREENLAND DRIVE",
                        "DistributionAmount": "$564.51",
                        "Phone": "(717) 295-1618",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5841,
                        "Number": "311271",
                        "Name": "ONQUE\u0027S DIAMOND SHINE, LLC",
                        "Address": "2315 NORTH 5TH STREET, HARRISBURG, PA 17110",
                        "Address1": "2315 NORTH 5TH STREET",
                        "DistributionAmount": "$1,000.82",
                        "Phone": "(717) 608-7498",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5872,
                        "Number": "311302",
                        "Name": "KONSTANTIN PROKOPCHUK",
                        "Address": "9891 BONNER STREET, PHILADELPHIA, PA 19115",
                        "Address1": "9891 BONNER STREET",
                        "DistributionAmount": "$6,409.87",
                        "Phone": "(215) 530-5105",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5874,
                        "Number": "311304",
                        "Name": "ELVIRE DOMINIQUE",
                        "Address": "123 HOLYBROOK LANE, GILBERTSVILLE, PA 19525",
                        "Address1": "123 HOLYBROOK LANE",
                        "DistributionAmount": "$2,172.59",
                        "Phone": "(610) 733-8257",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5876,
                        "Number": "311306",
                        "Name": "MANUSHAQE XHOXHAJ",
                        "Address": "2560 WALTON ROAD, HUNTINGDON VALLEY, PA 19006",
                        "Address1": "2560 WALTON ROAD",
                        "DistributionAmount": "$61,240.79",
                        "Phone": "(215) 750-5272",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5879,
                        "Number": "311309",
                        "Name": "JONG HUN AN",
                        "Address": "312 GILPIN ROAD, WILLOW GROVE, PA 19090",
                        "Address1": "312 GILPIN ROAD",
                        "DistributionAmount": "$2,268.98",
                        "Phone": "(215) 659-1282",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5885,
                        "Number": "311315",
                        "Name": "GLENDA R. PORTLOCK",
                        "Address": "320 WEST BRANCH AVENUE #4G, PINE HILL, NJ 08021",
                        "Address1": "320 WEST BRANCH AVENUE #4G",
                        "DistributionAmount": "$1,256.28",
                        "Phone": "(856) 879-5040",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5888,
                        "Number": "311318",
                        "Name": "ROBERT W. GLOVER",
                        "Address": "602 Middleton Place, Norristown, PA 19403",
                        "Address1": "602 Middleton Place",
                        "DistributionAmount": "$22,217.65",
                        "Phone": "(484) 751-2756",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5899,
                        "Number": "311329",
                        "Name": "MUOI L. HUYNH",
                        "Address": "2503 JACOBS DRIVE, SINKING SPRINGS, PA 19608",
                        "Address1": "2503 JACOBS DRIVE",
                        "DistributionAmount": "$6,827.72",
                        "Phone": "(267) 343-5476",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5906,
                        "Number": "311336",
                        "Name": "D L HYNSON COMPANIES",
                        "Address": "2314 W. 6TH STREET, WILMINGTON, DE 19805",
                        "Address1": "2314 W. 6TH STREET",
                        "DistributionAmount": "$5,652.79",
                        "Phone": "(302) 559-7889",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5908,
                        "Number": "311338",
                        "Name": "VERONICA GRIFFITH-JAMES",
                        "Address": "807 North Jordan Street, ALLENTOWN, PA 18102",
                        "Address1": "807 North Jordan Street",
                        "DistributionAmount": "$10,393.73",
                        "Phone": "(610) 821-8780",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5910,
                        "Number": "311340",
                        "Name": "NINA M. SAMUELS-BEY",
                        "Address": "4014 WYLAUSING AVENUE, PHILADELPHIA, PA 19140",
                        "Address1": "4014 WYLAUSING AVENUE",
                        "DistributionAmount": "$4,158.14",
                        "Phone": "(267) 249-9279",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5916,
                        "Number": "311346",
                        "Name": "OLLOMANI, LLC",
                        "Address": "2365 STEVEN ROAD, HUNTINGTON VALLEY, PA 19006",
                        "Address1": "2365 STEVEN ROAD",
                        "DistributionAmount": "$26,945.89",
                        "Phone": "(215) 990-7409",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5923,
                        "Number": "311353",
                        "Name": "WAKGARI BAJA",
                        "Address": "513 SECOND STREET, LANCASTER, PA 17603",
                        "Address1": "513 SECOND STREET",
                        "DistributionAmount": "$7,276.56",
                        "Phone": "(717) 381-1911",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5934,
                        "Number": "311364",
                        "Name": "D\u0027ANDRE T. PARMLEY \u0026 RAMON J. PARMLEY",
                        "Address": "3119 FONTAIN STREET, PHILADELPHIA, PA 19121",
                        "Address1": "3119 FONTAIN STREET",
                        "DistributionAmount": "$946.44",
                        "Phone": "(215) 533-5554",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5942,
                        "Number": "311372",
                        "Name": "G. PREMIUM, INC.",
                        "Address": "428 PIGEON VIEW LANE, NEW CASTLE, DE 19720",
                        "Address1": "428 PIGEON VIEW LANE",
                        "DistributionAmount": "$3,528.23",
                        "Phone": "(302) 897-0542",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5944,
                        "Number": "311374",
                        "Name": "INNOVATIVE SOLUTIONS, LLC",
                        "Address": "1017 LAMB ROAD, SECANE, PA 19018",
                        "Address1": "1017 LAMB ROAD",
                        "DistributionAmount": "$3,468.32",
                        "Phone": "(215) 820-3969",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5949,
                        "Number": "311379",
                        "Name": "MORALES ENTERPRISES, LLC",
                        "Address": "48 CRESTVIEW DRIVE, WILLINGBORO, NJ 08046",
                        "Address1": "48 CRESTVIEW DRIVE",
                        "DistributionAmount": "$3,244.70",
                        "Phone": "(609) 835-4473",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5953,
                        "Number": "311383",
                        "Name": "SETAOC INDUSTRIES, INC.",
                        "Address": "4070 BALWYNNE PARK ROAD, APT. #2, PHILADELPHIA, PA 19131",
                        "Address1": "4070 BALWYNNE PARK ROAD, APT. #2",
                        "DistributionAmount": "$33,013.48",
                        "Phone": "(215) 878-1216",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5970,
                        "Number": "311400",
                        "Name": "MONICA B. GRAHAM",
                        "Address": "533 ROSALIE STREET, PHILADELPHIA, PA 19120",
                        "Address1": "533 ROSALIE STREET",
                        "DistributionAmount": "$6,177.18",
                        "Phone": "(215) 824-0785",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5971,
                        "Number": "311401",
                        "Name": "JOSEPH B. GODFREY",
                        "Address": "848 NORWAY AENUE, HAMILTON, NJ 08629",
                        "Address1": "848 NORWAY AENUE",
                        "DistributionAmount": "$965.84",
                        "Phone": "(609) 394-0758",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5976,
                        "Number": "311406",
                        "Name": "FRANCIS C. TJIOE",
                        "Address": "1743 SOUTH CHADWICK STREET, PHILADELPHIA, PA 19145",
                        "Address1": "1743 SOUTH CHADWICK STREET",
                        "DistributionAmount": "$337.61",
                        "Phone": "",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5977,
                        "Number": "311407",
                        "Name": "ANZIE C. SMITH",
                        "Address": "5 EAST SAXONY DRIVE, NEW CASTLE, DE 19720",
                        "Address1": "5 EAST SAXONY DRIVE",
                        "DistributionAmount": "$851.57",
                        "Phone": "(302) 325-0102",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5983,
                        "Number": "311413",
                        "Name": "PATTYROC INDUSTRIES, LLC",
                        "Address": "12 TULIP COURT, PALMER, PA 18045",
                        "Address1": "12 TULIP COURT",
                        "DistributionAmount": "$9,008.48",
                        "Phone": "(908) 917-8542",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5988,
                        "Number": "311418",
                        "Name": "LYUBOMYRA TABAK",
                        "Address": "113 WALLS AVENUE, WILMINGTON, DE 19805",
                        "Address1": "113 WALLS AVENUE",
                        "DistributionAmount": "$8,330.63",
                        "Phone": "(302) 239-5768",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5992,
                        "Number": "311422",
                        "Name": "HIEN K. HUYNH",
                        "Address": "1934 LARDNER STREET, PHILADELPHIA, PA 19149",
                        "Address1": "1934 LARDNER STREET",
                        "DistributionAmount": "$5,187.48",
                        "Phone": "(267) 879-4794",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5995,
                        "Number": "311425",
                        "Name": "SHLOMARR D. FAISON",
                        "Address": "2803 STANBRIDGE STREET, APT. B401, NORRISTOWN, PA 19401",
                        "Address1": "2803 STANBRIDGE STREET, APT. B401",
                        "DistributionAmount": "$3,485.38",
                        "Phone": "(267) 342-3309",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5997,
                        "Number": "311427",
                        "Name": "FITZROY A. GORDON",
                        "Address": "737 WEISER STREET, READING, PA 19601",
                        "Address1": "737 WEISER STREET",
                        "DistributionAmount": "$3,247.85",
                        "Phone": "(610) 577-1545",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 5998,
                        "Number": "311428",
                        "Name": "JULIET NGUYEN",
                        "Address": "6431 GUYER AVENUE, PHILADELPHIA, PA 19142",
                        "Address1": "6431 GUYER AVENUE",
                        "DistributionAmount": "$1,636.96",
                        "Phone": "(267) 736-0129",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6001,
                        "Number": "311431",
                        "Name": "MAMICA BICA",
                        "Address": "8348 LANGDON STREET, PHILADELPHIA, PA 19152",
                        "Address1": "8348 LANGDON STREET",
                        "DistributionAmount": "$3,572.28",
                        "Phone": "(215) 342-9843",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6002,
                        "Number": "311432",
                        "Name": "SHLOMARR D. FAISON",
                        "Address": "2803 STANBRIDGE STREET, APT. B401, NORRISTOWN, PA 19401",
                        "Address1": "2803 STANBRIDGE STREET, APT. B401",
                        "DistributionAmount": "$3,271.67",
                        "Phone": "(267) 342-3309",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6007,
                        "Number": "311437",
                        "Name": "KADRI MEMEDOSKI \u0026 ALBERTO SABRI",
                        "Address": "1643 WINDMILL LANE, BREINIGSVILLE, PA 18031",
                        "Address1": "1643 WINDMILL LANE",
                        "DistributionAmount": "$2,839.96",
                        "Phone": "(215) 342-7696",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6019,
                        "Number": "311449",
                        "Name": "A. M. SALANDY \u0026 S. D. SALANDY",
                        "Address": "173 SALANDY DRIVE, HOUSTON, DE 19954",
                        "Address1": "173 SALANDY DRIVE",
                        "DistributionAmount": "$0.00",
                        "Phone": "(302) 398-4659",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6021,
                        "Number": "311451",
                        "Name": "Brandon Brown, Bruce Hall, Jr and Levi McCants, Jr.",
                        "Address": "1001 East Slocum Street, Philadelphia, PA 19150",
                        "Address1": "1001 East Slocum Street",
                        "DistributionAmount": "$1,444.15",
                        "Phone": "(215) 782-1410",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6024,
                        "Number": "311454",
                        "Name": "MARIA CRUZ ENTERPRISE, LLC",
                        "Address": "6 CANTERBURRY STREET, EGG HARBOR TOWNSHIP, NJ 08234",
                        "Address1": "6 CANTERBURRY STREET",
                        "DistributionAmount": "$6,341.24",
                        "Phone": "(609) 576-2864",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6028,
                        "Number": "311458",
                        "Name": "MARLON D. FLORES",
                        "Address": "24 ROBIN ROAD, EGG HARBOR TOWNSHIP, NJ 08234",
                        "Address1": "24 ROBIN ROAD",
                        "DistributionAmount": "$3,298.02",
                        "Phone": "(609) 816-5217",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6031,
                        "Number": "311461",
                        "Name": "L. F. MELENDEZ \u0026 D. R. MOLINA",
                        "Address": "1 SPRING LANE, EGG HARBOR TOWNSHIP, NJ 08234",
                        "Address1": "1 SPRING LANE",
                        "DistributionAmount": "$0.00",
                        "Phone": "(609) 338-3242",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6035,
                        "Number": "311465",
                        "Name": "SINAN ENTERPRISES, LLC",
                        "Address": "1443 WINDMILL LANE, BREINIGSVILLE, PA 18031",
                        "Address1": "1443 WINDMILL LANE",
                        "DistributionAmount": "$87,709.25",
                        "Phone": "(610) 349-3647",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6041,
                        "Number": "311471",
                        "Name": "DARRYL M. WILLIAMS",
                        "Address": "1805 HARRISON STREET, PHILADELPHIA, PA 19124",
                        "Address1": "1805 HARRISON STREET",
                        "DistributionAmount": "$1,031.56",
                        "Phone": "(215) 992-6370",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6042,
                        "Number": "311472",
                        "Name": "APOLLON, LLC",
                        "Address": "8610 GILLESPIE STREET, PHILADELPHIA, PA 19136",
                        "Address1": "8610 GILLESPIE STREET",
                        "DistributionAmount": "$702.65",
                        "Phone": "(215) 331-2226",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6046,
                        "Number": "311476",
                        "Name": "DANTE B. RAMOS \u0026 MARISSA O. RAMOS",
                        "Address": "507 MARCIA LANE, EAST NORRITON, PA 19403",
                        "Address1": "507 MARCIA LANE",
                        "DistributionAmount": "$3,009.38",
                        "Phone": "(610) 277-7804",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6048,
                        "Number": "311478",
                        "Name": "ALSOLUTION, L.L.C.",
                        "Address": "1A CONGRESSIONAL DRIVE, GREENVILLE, DE 19807",
                        "Address1": "1A CONGRESSIONAL DRIVE",
                        "DistributionAmount": "$17,567.42",
                        "Phone": "(302) 376-0194",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6056,
                        "Number": "311486",
                        "Name": "DM SOLUTIONS, LLC",
                        "Address": "2233 WEST PAGE STREET, PHILADELPHIA, PA 19121",
                        "Address1": "2233 WEST PAGE STREET",
                        "DistributionAmount": "$6,537.35",
                        "Phone": "(215) 313-0652",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6060,
                        "Number": "311490",
                        "Name": "GLENROY A. BROOKS",
                        "Address": "109 WOODSHADE DRIVE, NEWARK, DE 19702",
                        "Address1": "109 WOODSHADE DRIVE",
                        "DistributionAmount": "$5,798.35",
                        "Phone": "(302) 363-8073",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6062,
                        "Number": "311492",
                        "Name": "PEACHES N. COX",
                        "Address": "802 UNRUH AVENUE, PHILADELPHIA, PA 19111",
                        "Address1": "802 UNRUH AVENUE",
                        "DistributionAmount": "$5,230.15",
                        "Phone": "(267) 335-3860",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6067,
                        "Number": "311497",
                        "Name": "CYNTHIA LOMBARDO",
                        "Address": "148 BISHOPS DRIVE, ASTON, PA 19014",
                        "Address1": "148 BISHOPS DRIVE",
                        "DistributionAmount": "$2,799.80",
                        "Phone": "(610) 459-0970",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6071,
                        "Number": "311501",
                        "Name": "WIWIN ENTERPRISE, LLC",
                        "Address": "2128 SOUTH 6TH STREET, PHILADELPHIA, PA 19148",
                        "Address1": "2128 SOUTH 6TH STREET",
                        "DistributionAmount": "$1,428.07",
                        "Phone": "(267) 269-7857",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6079,
                        "Number": "311509",
                        "Name": "SVT SOLUTIONS, LLC",
                        "Address": "15 MEADOWRUE DRIVE, MOUNT LAUREL, NJ 08054",
                        "Address1": "15 MEADOWRUE DRIVE",
                        "DistributionAmount": "$1,016.96",
                        "Phone": "(856) 234-1524",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6080,
                        "Number": "311510",
                        "Name": "MAYFLOWERS ENTERPRISE, LLC",
                        "Address": "408 OHIO AVENUE, ATLANTIC CITY, NJ 08401",
                        "Address1": "408 OHIO AVENUE",
                        "DistributionAmount": "$0.00",
                        "Phone": "(609) 431-3969",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6082,
                        "Number": "311512",
                        "Name": "K \u0026 L BURRELL ENTERPRISES, LLC",
                        "Address": "88 WOODLAKE DRIVE, HOLLAND, PA 18966",
                        "Address1": "88 WOODLAKE DRIVE",
                        "DistributionAmount": "$2,615.16",
                        "Phone": "(215) 579-0104",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6084,
                        "Number": "311514",
                        "Name": "B \u0026 H ENTERPRISES, LLC",
                        "Address": "113 RED MAPLE LANE, MOUNTVILLE, PA 17554",
                        "Address1": "113 RED MAPLE LANE",
                        "DistributionAmount": "$12,055.89",
                        "Phone": "(717) 560-9206",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6088,
                        "Number": "311518",
                        "Name": "DOUBLE N, LLC",
                        "Address": "8618 COLONY DRIVE, PHILADELPHIA, PA 19152",
                        "Address1": "8618 COLONY DRIVE",
                        "DistributionAmount": "$2,799.11",
                        "Phone": "(267) 283-7451",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6092,
                        "Number": "311522",
                        "Name": "BRISSETT ASSOCIATES, LLC",
                        "Address": "827 EAST PRICE STREET, PHILADELPHIA, PA 19138",
                        "Address1": "827 EAST PRICE STREET",
                        "DistributionAmount": "$1,080.96",
                        "Phone": "(215) 438-1772",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6093,
                        "Number": "311523",
                        "Name": "KORSSA ASSOCIATES, LLC",
                        "Address": "752 HAMILTON STREET, LANCASTER, PA 17602",
                        "Address1": "752 HAMILTON STREET",
                        "DistributionAmount": "$1,721.53",
                        "Phone": "(717) 392-7795",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6094,
                        "Number": "311524",
                        "Name": "N \u0026 H ENTERPRISES, LLC",
                        "Address": "4505 FRANKFORD AVENUE, PHILADELPHIA, PA 19124",
                        "Address1": "4505 FRANKFORD AVENUE",
                        "DistributionAmount": "$9,048.06",
                        "Phone": "(267) 825-6685",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6095,
                        "Number": "311525",
                        "Name": "JBA ENTERPRISES, LLC",
                        "Address": "109 PEACE COURT WEST, BEAR, DE 19701",
                        "Address1": "109 PEACE COURT WEST",
                        "DistributionAmount": "$28,975.36",
                        "Phone": "(267) 902-2886",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6098,
                        "Number": "311528",
                        "Name": "CASTRO ASSOCIATES, INC.",
                        "Address": "2905 MAPLE AVENUE, BRISTOL, PA 19007",
                        "Address1": "2905 MAPLE AVENUE",
                        "DistributionAmount": "$2,411.95",
                        "Phone": "(215) 630-1477",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6102,
                        "Number": "311532",
                        "Name": "AYALA ENTERPRISES, LLC",
                        "Address": "33 MADISON AVENUE, CHERRY HILL, NJ 08002",
                        "Address1": "33 MADISON AVENUE",
                        "DistributionAmount": "$12,096.68",
                        "Phone": "(856) 986-0338",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6107,
                        "Number": "311537",
                        "Name": "SEVEN M ENTERPRISES, LLC",
                        "Address": "5434 BINGHAM STREET, PHILADELPHIA, PA 19120",
                        "Address1": "5434 BINGHAM STREET",
                        "DistributionAmount": "$1,166.32",
                        "Phone": "(215) 744-5083",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6108,
                        "Number": "311538",
                        "Name": "LATOLLARI ASSOCIATES, LLC",
                        "Address": "41 RADNOR DRIVE, NEWTOWN SQUARE, PA 19073",
                        "Address1": "41 RADNOR DRIVE",
                        "DistributionAmount": "$7,042.71",
                        "Phone": "(610) 358-4774",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6114,
                        "Number": "311544",
                        "Name": "DISHA ASSOCIATES, LLC",
                        "Address": "446 NORTH MILL ROAD, KENNETT SQUARE, PA 19348",
                        "Address1": "446 NORTH MILL ROAD",
                        "DistributionAmount": "$33,836.01",
                        "Phone": "(610) 322-4328",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6115,
                        "Number": "311545",
                        "Name": "SIMMONS ENTERPRISES, LLC",
                        "Address": "3732 GARDEN AVENUE, PENNSAUKEN, NJ 08109",
                        "Address1": "3732 GARDEN AVENUE",
                        "DistributionAmount": "$0.00",
                        "Phone": "(856) 283-1347",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6116,
                        "Number": "311546",
                        "Name": "WELLYN ENTERPRISES, LLC",
                        "Address": "1813 SOUTH NEW KIRK STREET, PHILADELPHIA, PA 19145",
                        "Address1": "1813 SOUTH NEW KIRK STREET",
                        "DistributionAmount": "$0.00",
                        "Phone": "(215) 268-8206",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6118,
                        "Number": "311548",
                        "Name": "JEON ASSOCIATES, LLC",
                        "Address": "2508 WHITPAIN HILLS DRIVE, BLUE BELL, PA 19422",
                        "Address1": "2508 WHITPAIN HILLS DRIVE",
                        "DistributionAmount": "$0.00",
                        "Phone": "(267) 991-3981",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6119,
                        "Number": "311549",
                        "Name": "PHI ENTERPRISES, LLC",
                        "Address": "932 BEECHWOOD AVENUE, COLLINGDALE, PA 19023",
                        "Address1": "932 BEECHWOOD AVENUE",
                        "DistributionAmount": "$337.69",
                        "Phone": "(734) 323-8305",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6121,
                        "Number": "311551",
                        "Name": "KONDO ASSOCIATES, LLC",
                        "Address": "4328 ALDINE STREET, PHILADELPHIA, PA 19136",
                        "Address1": "4328 ALDINE STREET",
                        "DistributionAmount": "$0.00",
                        "Phone": "(215) 338-5039",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6124,
                        "Number": "311554",
                        "Name": "SHINS ENTERPRISES, LLC",
                        "Address": "288 COPPER BEECH DRIVE, BLUE BELL, PA 19422",
                        "Address1": "288 COPPER BEECH DRIVE",
                        "DistributionAmount": "$0.00",
                        "Phone": "(267) 266-2622",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6125,
                        "Number": "311555",
                        "Name": "ZOMO, LLC",
                        "Address": "1961 DREXEL AVENUE, LANCASTER, PA 17602",
                        "Address1": "1961 DREXEL AVENUE",
                        "DistributionAmount": "$4,990.55",
                        "Phone": "(717) 435-7597",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6126,
                        "Number": "311556",
                        "Name": "G.R.G. UNIQUE IMPRESSIONS, LLC",
                        "Address": "6101 WASHINGTON DRIVE, READING, PA 19606",
                        "Address1": "6101 WASHINGTON DRIVE",
                        "DistributionAmount": "$4,277.65",
                        "Phone": "(484) 332-5431",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6127,
                        "Number": "311557",
                        "Name": "PILGER RUH, INC.",
                        "Address": "14 W MARKET STREET #214, GRATZ, PA 17030",
                        "Address1": "14 W MARKET STREET #214",
                        "DistributionAmount": "$10,184.82",
                        "Phone": "(717) 979-9329",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6128,
                        "Number": "311558",
                        "Name": "LEKBAR, LLC",
                        "Address": "1177 Valley View Drive, Allentown, PA 18103",
                        "Address1": "1177 Valley View Drive",
                        "DistributionAmount": "$5,523.35",
                        "Phone": "(267) 374-1812",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6129,
                        "Number": "311559",
                        "Name": "I.N. FAREED, LLC",
                        "Address": "28 BEACON LANE, NEW CASTLE, DE 19720",
                        "Address1": "28 BEACON LANE",
                        "DistributionAmount": "$2,446.39",
                        "Phone": "(610) 636-5856",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6130,
                        "Number": "311560",
                        "Name": "SPECTACULAR ENTERPRISE, LLC",
                        "Address": "1548 GREGG STREET, UNIT B, PHILADELPHIA, PA 19115",
                        "Address1": "1548 GREGG STREET, UNIT B",
                        "DistributionAmount": "$14,055.17",
                        "Phone": "(412) 600-9699",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6131,
                        "Number": "311561",
                        "Name": "SUBER\u0027S SONNYBOY, LLC",
                        "Address": "5720 NORTH MARVINE STREET, PHILADELPHIA, PA 19142",
                        "Address1": "5720 NORTH MARVINE STREET",
                        "DistributionAmount": "$601.43",
                        "Phone": "(215) 586-8602",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6132,
                        "Number": "311562",
                        "Name": "JT ELEGANT HELPING HAND, LLC",
                        "Address": "536 DOLPHIN AVENUE, NORTHFIELD, NJ 08225",
                        "Address1": "536 DOLPHIN AVENUE",
                        "DistributionAmount": "$6,010.87",
                        "Phone": "(609) 334-9367",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6133,
                        "Number": "311563",
                        "Name": "NIMBA ENTERPRISES, LLC",
                        "Address": "93 ROSELYN STREET, PHILADELPHIA, PA 19120",
                        "Address1": "93 ROSELYN STREET",
                        "DistributionAmount": "$0.00",
                        "Phone": "(215) 971-6725",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6134,
                        "Number": "311564",
                        "Name": "WHITE GLOVE ENTERPRISE, LLC",
                        "Address": "4009 PARKSIDE CT, MOUNT JOY, PA 17552",
                        "Address1": "4009 PARKSIDE CT",
                        "DistributionAmount": "$0.00",
                        "Phone": "(717) 825-0500",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6135,
                        "Number": "311565",
                        "Name": "MOST HIGH SANITATION, LLC",
                        "Address": "622 STOCKTON DRIVE, WILLIAMSTOWN, NJ 08094",
                        "Address1": "622 STOCKTON DRIVE",
                        "DistributionAmount": "$6,449.82",
                        "Phone": "(609) 247-9539",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6136,
                        "Number": "311566",
                        "Name": "24 HOURS A DAY ENTERPRISE, LLC",
                        "Address": "750 ACADEMY TERRACE, APT A, SHARON HILL, PA 19079",
                        "Address1": "750 ACADEMY TERRACE, APT A",
                        "DistributionAmount": "$3,159.24",
                        "Phone": "(484) 340-0549",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6137,
                        "Number": "311567",
                        "Name": "NOVERON\u0027S ENTERPRISE, LLC",
                        "Address": "3812 EUNICE AVENUE, WILMINGTON, DE 19808",
                        "Address1": "3812 EUNICE AVENUE",
                        "DistributionAmount": "$31,602.58",
                        "Phone": "(302) 268-3763",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6138,
                        "Number": "311568",
                        "Name": "W\u0026B SOLUTIONS, LLC",
                        "Address": "2581 BALWYNNE PARK ROAD, APT. 1, PHILADELPHIA, PA 19131",
                        "Address1": "2581 BALWYNNE PARK ROAD, APT. 1",
                        "DistributionAmount": "$0.00",
                        "Phone": "(610) 500-4008",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6139,
                        "Number": "311569",
                        "Name": "JBG, LLC",
                        "Address": "637 PENN AVENUE, WEST READING, PA 19611",
                        "Address1": "637 PENN AVENUE",
                        "DistributionAmount": "$7,067.47",
                        "Phone": "(610) 858-4408",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6140,
                        "Number": "311570",
                        "Name": "IT\u0027S R JOY, LLC",
                        "Address": "11 SHAWN LANE, BEAR, DE 19701",
                        "Address1": "11 SHAWN LANE",
                        "DistributionAmount": "$29,552.70",
                        "Phone": "(302) 293-2803",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6141,
                        "Number": "311571",
                        "Name": "THE PERFECT FIX, LLC",
                        "Address": "54 LEMPA ROAD, HOLLAND, PA 18966",
                        "Address1": "54 LEMPA ROAD",
                        "DistributionAmount": "$4,505.93",
                        "Phone": "(215) 715-5842",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6142,
                        "Number": "311572",
                        "Name": "CCKEYES MANAGEMENT GROUP, LLC",
                        "Address": "5638 NORTH 18TH STREET, PHILADELPHIA, PA 19141",
                        "Address1": "5638 NORTH 18TH STREET",
                        "DistributionAmount": "$2,886.34",
                        "Phone": "(919) 621-7111",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6143,
                        "Number": "311573",
                        "Name": "GREAT SOLUTIONS ENTERPRISE LLC",
                        "Address": "342 FOUNTAIN AVENUE, CAMDEN, NJ 08105",
                        "Address1": "342 FOUNTAIN AVENUE",
                        "DistributionAmount": "$0.00",
                        "Phone": "(856) 366-7427",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6144,
                        "Number": "311574",
                        "Name": "GIBSON BROTHERS ENVIRONMENTAL",
                        "Address": "591 GENERAL ARMSTRONG ROAD, KING OF PRUSSIA, PA 19406",
                        "Address1": "591 GENERAL ARMSTRONG ROAD",
                        "DistributionAmount": "$10,752.86",
                        "Phone": "(610) 630-3856",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6145,
                        "Number": "311ZZ5",
                        "Name": "IN-HOUSE PHILADELPHIA",
                        "Address": "2500 EISENHOWER AVENUE, NORRISTOWN, PA 19403",
                        "Address1": "2500 EISENHOWER AVENUE",
                        "DistributionAmount": "$0.00",
                        "Phone": "",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6146,
                        "Number": "311ZZ6",
                        "Name": "JANI-KING PHILADELPHIA SUPPLY",
                        "Address": "2500 EISENHOWER AVENUE, NORRISTOWN, PA 19403",
                        "Address1": "2500 EISENHOWER AVENUE",
                        "DistributionAmount": "$0.00",
                        "Phone": "",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6147,
                        "Number": "311ZZ7",
                        "Name": "JANI-KING PHILADELPHIA - HT",
                        "Address": "2500 EISENHOWER AVENUE, NORRISTOWN, PA 19403",
                        "Address1": "2500 EISENHOWER AVENUE",
                        "DistributionAmount": "$8,273.00",
                        "Phone": "(610) 650-0355",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6148,
                        "Number": "311ZZ8",
                        "Name": "JANI-KING PHILADELPHIA - BUCKS",
                        "Address": "2500 EISENHOWER AVENUE, NORRISTOWN, PA 19403",
                        "Address1": "2500 EISENHOWER AVENUE",
                        "DistributionAmount": "$0.00",
                        "Phone": "(610) 650-0355",
                        "StatusName": "Active",
                        "IsTemp": 0
                    },
                    {
                        "ID": 6149,
                        "Number": "311ZZ9",
                        "Name": "IN-HOUSE SPRING FORD SCHOOLS",
                        "Address": "2500 EISENHOWER AVENUE, NORRISTOWN, PA ",
                        "Address1": "2500 EISENHOWER AVENUE",
                        "DistributionAmount": "$0.00",
                        "Phone": "",
                        "StatusName": "Active",
                        "IsTemp": 0
                    }
                ]
            }
        ]
    }
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
 *  Update a DB
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
 *  Delete a DB
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

