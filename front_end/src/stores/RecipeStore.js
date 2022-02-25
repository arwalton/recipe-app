
class RecipeStore{
    constructor(initialState) {
        this.state = initialState;

        //Store listener functions
        this.ingredientListeners = [];
        this.selectedIngredientListeners = [];
        this.recipeListeners = [];
        this.ingredientToSubstituteListeners = [];
        this.ingredientSubstitutionsListeners = [];
        this.filterTextListeners = [];
    }

    //Ingredients
    addIngredientListener (listener) {
        this.ingredientListeners.push(listener);
        const removeListener = () => {
            this.ingredientListeners  = this.ingredientListeners.filter((l) => listener !== l );
        }
        return removeListener; 
    }

    setIngredients (state) {
        this.state.ingredients = state;
        for (const listener of this.ingredientListeners){
            listener(state);
        }
    }

    getIngredients () {
        return this.state.ingredients;
    }

    //Selected Ingredients
    addSelectedIngredientListener (listener) {
        this.selectedIngredientListeners.push(listener);
    }

    setSelectedIngredients (state) {
        this.state.selectedIngredients = state;
        for (const listener of this.selectedIngredientListeners){
            listener(state);
        }
    }

    getSelectedIngredients (state) {
        return this.state.selectedIngredients;
    }

    //Recipes
    addRecipeListener (listener){
        this.recipeListeners.push(listener);
    }

    setRecipes (state) {
        this.state.recipes = state;
        for (const listener of this.recipeListeners){
            listener(state);
        }
    }

    getRecipes () {
        return this.state.recipes;
    }

    //IngredientToSubstitute
    addIngredientToSubstituteListener(listener){
        this.ingredientSubstitutionsListeners.push(listener);
    }

    setIngredientToSubstitute(state){
        this.state.ingredientToSubstitute = state;
        for (const listener of this.ingredientToSubstituteListeners){
            listener(state);
        }
    }

    getIngredientToSubstitute(){
        return this.state.ingredientToSubstitute;
    }

    addIngredientSubstitutionsListener(listener){
        this.ingredientSubstitutionsListeners.push(listener);
    }

    setIngredientSubstitutions(state){
        this.state.ingredientSubstitutions = state;
        for (const listener of this.ingredientSubstitutionsListeners){
            listener(state);
        }
    }

    getIngredientSubstitutions(){
        return this.state.ingredientSubstitutions;
    }

    addFilterTextListener(listener){
        this.filterTextListeners.push(listener);
    }

    setFilterText(state){
        this.state.filterText = state;
        for (const listener of this.filterTextListeners){
            listener(state);
        }
    }

    getFilterText(){
        return this.state.filterText;
    }
}

const recipeStore = new RecipeStore({});
export default recipeStore;