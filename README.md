# Async Ingredient Finder

A JavaScript application demonstrating asynchronous programming patterns through a practical recipe ingredient availability checker. Compare sequential vs parallel processing across multiple store APIs.

## Features

- **Sequential Search**: Check stores one by one with distance-based recommendations
- **Parallel Search**: Check all stores simultaneously using Promise.all()  
- **Race Search**: Find first available store using Promise.race()
- **Shopping List**: Process multiple ingredients efficiently
- **Performance Metrics**: Compare execution times between different approaches

## Store Network

- **Fresh Mart** - 12 Nile Street (1200m away)
- **Metro Foods** - 33 Aswan Corniche (900m away)  
- **QuickBuy** - 88 Sohag Station Street (3400m away)
- **Market Hub** - 14 Luxor Temple Street (150m away)

## Available Ingredients

Carrots, milk, apple, cheese, flour, butter, cola, chocolate, eggs

## Usage

```javascript
const checker = new RecipeChecker();

// Sequential search with distance recommendation
await checker.findIngredientSequential("cheese");

// Parallel search (faster)
await checker.findIngredientParallel("milk");

// Find first available store
await checker.findFirstAvailable("chocolate");

// Process shopping list
await checker.checkShoppingList(["milk", "flour", "eggs"]);
```

## Learning Objectives

- **Promise.all()**: Execute multiple async operations in parallel
- **Promise.race()**: Get first resolved promise from a group
- **Sequential vs Parallel**: Compare performance and use cases
- **Error Handling**: Graceful handling of network failures and missing ingredients
- **Class Design**: Organize related functionality with proper encapsulation

## Performance Comparison

```
Sequential Search: ~4000ms (waits for each store)
Parallel Search:   ~1500ms (checks all stores simultaneously)  
Race Search:       ~600ms  (stops at first success)
```

## Implementation Highlights

- Simulated network delays (500-2000ms per store)
- Distance-based store recommendations
- Comprehensive error handling and validation
- Clean, readable output with performance timing
- Real-world data structure with store locations and details

## Next Steps

- Add price comparison functionality
- Implement caching for repeated ingredient searches  
- Add more sophisticated error recovery patterns
- Extend to support recipe-based shopping optimization

## License

MIT License - Feel free to use this for learning asynchronous JavaScript patterns!
