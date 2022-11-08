let data = [];

let count = 1;
const genData = (material, customer, date, num) => {
    for (let i = 0; i <= num - 1; i++) {
        data.push({
            "_id": String(count),
            "material": material,
            "customer": customer,
            "refNum": String(Math.floor(String(count) + (Math.random() * 10000))),
            "scheduled": {
                "date": date
            },
            "reScheduled": {
                "date": null,
                "reason": null
            },
            "cancelled": {
                "date": null,
                "reason": null
            },
            "in": {
                "nth": null,
                "date": null,
                "time": null
            },
            "loading": {
                "start": {
                    "nth": null,
                    "time": null
                },
                "finish": {
                    "nth": null,
                    "time": null
                }
            },
            "out": {
                "nth": null,
                "time": null
            }
        });
        count++;
    };
}

genData("Mixed paper", 'WPT', '2022-10-25', 2);
genData("Mixed paper", 'Peute', '2022-10-25', 1);
genData("PET clear", 'MRL', '2022-12-20', 1);
genData("OCC", 'Edwards', '2022-12-20', 2);
genData("Glass", 'URM', '2022-12-20', 3);
genData("Mixed plastic", 'Veolia', '2022-12-25', 1);

export default data;