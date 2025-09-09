class RecipeChecker {
    constructor () {
        this.stores = ["fresh mart", "metro foods", "quickbuy", "market hub"];
        this.ingredients = ["carrots", "milk", "apple", "cheese", "flour", "butter", "cola", "chocolate", "eggs"];
    }

    async fetchStoreIngredients (store) {
        console.log(`fetching data from ${store}`);

        return new Promise ((resolve, reject) => {
            const networkDelay = (Math.random() * 1500) + 500;

            setTimeout(() => {
                const storeDatabase = {
                    "fresh mart": {
                        name: "Fresh Mart",
                        since: 1990,
                        location: "12 Nile Street",
                        distance: 1200, // meters
                        availableIngredients: ["carrots", "milk", "apple", "cheese"]
                    },
                    "metro foods": {
                        name: "Metro Foods",
                        since: 1995,
                        location: "33 Aswan Corniche",
                        distance: 900, // meters
                        availableIngredients: ["flour", "butter", "cola", "cheese"]
                    },
                    "quickbuy": {
                        name: "QuickBuy",
                        since: 2020,
                        location: "88 Sohag Station Street",
                        distance: 3400, // meters
                        availableIngredients: ["flour", "chocolate", "cola", "carrots"]
                    },
                    "market hub": {
                        name: "Market Hub",
                        since: 2012,
                        location: "14 Luxor Temple Street",
                        distance: 150, // meters
                        availableIngredients: ["milk", "eggs", "cheese"]
                    }
                };

                const storeKey = store.toLowerCase();

                if (storeDatabase[storeKey]) {
                    const storeData = {
                        ...storeDatabase[storeKey],
                        timestamp: Date.now()
                    };

                    console.log(`store data found for ${store}`);
                    resolve(storeData);
                } else {
                    const availableStore = Object.keys(storeDatabase).join(", ");
                    reject(`${store} is not supported, check our stores: ${availableStore}`);
                }

            }, networkDelay)
        })
    }

    validateIngredient (ingredient) {
        if (!ingredient || typeof ingredient !== 'string' || ingredient.trim() === "") {
            throw new Error("invalid ingredient");
        }
    }

    async checkFreshMart (ingredient) {
        try {
            this.validateIngredient (ingredient);

            const freshMartData = await this.fetchStoreIngredients("fresh mart");

            if (freshMartData.availableIngredients.includes(ingredient)) {
                console.log(`${ingredient} is available at ${freshMartData.name}`);
                return freshMartData;
            } else {
                throw new Error(`ingredient not available at ${freshMartData.name}`)
            }
        } catch (error) {
            console.log(`error: ${error.message}`);
            return null;
        }
    }

    async checkMetroFoods (ingredient) {
        try {
            this.validateIngredient (ingredient)

            const metroFoodsData = await this.fetchStoreIngredients("metro foods");

            if (metroFoodsData.availableIngredients.includes(ingredient)) {
                console.log(`${ingredient} is available at ${metroFoodsData.name}`);
                return metroFoodsData;
            } else {
                throw new Error(`ingredient not available at ${metroFoodsData.name}`)
            }
        } catch (error) {
            console.log(`error: ${error.message}`);
            return null;
        }
    }

    async checkQuickBuy (ingredient) {
        try {
            this.validateIngredient (ingredient)

            const quickBuyData = await this.fetchStoreIngredients("quickbuy");

            if (quickBuyData.availableIngredients.includes(ingredient)) {
                console.log(`${ingredient} is available at ${quickBuyData.name}`);
                return quickBuyData;
            } else {
                throw new Error(`ingredient not available at ${quickBuyData.name}`)
            }
        } catch (error) {
            console.log(`error: ${error.message}`);
            return null;
        }
    }

    async checkMarketHub (ingredient) {
        try {
            this.validateIngredient (ingredient)

            const marketHubData = await this.fetchStoreIngredients("market hub");

            if (marketHubData.availableIngredients.includes(ingredient)) {
                console.log(`${ingredient} is available at ${marketHubData.name}`);
                return marketHubData;
            } else {
                throw new Error(`ingredient not available at ${marketHubData.name}`)
            }
        } catch (error) {
            console.log(`error: ${error.message}`);
            return null;
        }
    }

    async checkStores (storeName, ingredient) {
        try {
            if (!this.stores.includes(storeName.toLowerCase())) {
                throw new Error(`${storeName} is not supported`);
            }

            const storeData = await this.fetchStoreIngredients(storeName);

            if (storeData.availableIngredients.includes(ingredient)) {
                console.log(`${ingredient} is available at ${storeData.name}`);
                return storeData;
            } else {
                throw new Error(`ingredient not available at ${storeData.name}`)
            }

        } catch (error) {
            console.log(`error: ${error.message}`);
            return null;
        }
    }

    async findIngredientSequential (ingredient) {
        let minDistance = Infinity;
        let minDistanceStore;
        let result = [];
        const start = Date.now();

        const freshMartResult = await this.checkStores("fresh mart", ingredient) // this.checkFreshMart(ingredient);
        
        if (freshMartResult !== null) {
            result.push(freshMartResult.name);

            if (minDistance > freshMartResult.distance) {
                minDistance = freshMartResult.distance;
                minDistanceStore = freshMartResult.name;
            }
        }

        const metroFoodsResult = await this.checkStores("metro foods", ingredient) // this.checkMetroFoods(ingredient);
        
        if (metroFoodsResult !== null) {
            result.push(metroFoodsResult.name);

            if (minDistance > metroFoodsResult.distance) {
                minDistance = metroFoodsResult.distance;
                minDistanceStore = metroFoodsResult.name;
            }
        }

        const quickBuyResult = await this.checkStores("quickbuy", ingredient) // this.checkQuickBuy(ingredient);
        
        if (quickBuyResult !== null) {
            result.push(quickBuyResult.name);

            if (minDistance > quickBuyResult.distance) {
                minDistance = quickBuyResult.distance;
                minDistanceStore = quickBuyResult.name;
            }
        }

        const marketHubResult = await this.checkStores("market hub", ingredient) // this.checkMarketHub(ingredient);
        
        if (marketHubResult !== null) {
            result.push(marketHubResult.name);

            if (minDistance > marketHubResult.distance) {
                minDistance = marketHubResult.distance;
                minDistanceStore = marketHubResult.name;
            }
        }

        if (result.length === 0) {
            return `${ingredient} is not available at our supported stores`;
        }

        const duration = Date.now() - start;
        console.log(`${ingredient} is available at ${result.slice(0, -1).join(", ")} and ${result.slice(-1)}`);
        console.log(`recommendation: go to ${minDistanceStore}, distance to cover: ${minDistance} meters`)
        console.log(`search took ${duration} ms`);
        dash();
        return result;
    }

    async findIngredientParallel (ingredient) {
        const start = Date.now();
        const results = await Promise.all([
            this.checkStores("fresh mart", ingredient).catch(() => null), // this.checkFreshMart(ingredient).catch(() => null),
            this.checkStores("metro foods", ingredient).catch(() => null), // this.checkMetroFoods(ingredient).catch(() => null),
            this.checkStores("quickbuy", ingredient).catch(() => null), // this.checkQuickBuy(ingredient).catch(() => null),
            this.checkStores("market hub", ingredient).catch(() => null) // this.checkMarketHub(ingredient).catch(() => null)
        ])

        const availableStores = results.filter(store => store !== null);

        const duration = Date.now() - start;

        if (availableStores.length === 0) {
            console.log(`${ingredient} is not available at our supported stores`);
        } else if (availableStores.length === 1) {
            console.log(`${ingredient} is available at ${availableStores[0].name}`);
        } else {
            console.log(`${ingredient} is available at ${availableStores.map(store => store.name).slice(0, -1).join(", ")} and ${availableStores.slice(-1)[0].name}`);
        }

        console.log(`search took ${duration} ms`);
        dash();
        return availableStores;
    }

    async findFirstAvailable (ingredient) {
        const storePromises = this.stores.map(store => this.checkStores(store, ingredient).catch(() => null));

        try {
            const firstResult = await Promise.race(storePromises);

            if (firstResult) {
                console.log(`First available: ${firstResult.name}`);
                return firstResult;
            } else {
                throw new Error(`${ingredient} is not available at first store`);
            }
        } catch (error) {
            console.log(`error: ${error.message}`);
            return null;
        }
    }

    async checkShoppingList (ingredients) {
        try {
            if (ingredients.length === 0) {
                throw new Error("list is empty");
            }

            const result = {};

            for (const ingredient of ingredients) {
                result[ingredient] = await this.findIngredientParallel(ingredient);
                dash();
            }

            return result;

        } catch (error) {
            return `error: ${error.message}`;
        }
    }
};

function dash () {
    console.log(`-------------------------------------------`);
}
