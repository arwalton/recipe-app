
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
        const removeListener = () => {
            this.selectedIngredientListeners  = this.selectedIngredientListeners.filter((l) => listener !== l );
        }
        return removeListener; 
    }

    addSelectedIngredient(ingredient){

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
        const removeListener = () => {
            this.recipeListeners  = this.recipeListeners.filter((l) => listener !== l );
        }
        return removeListener; 
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
        const removeListener = () => {
            this.ingredientToSubstituteListeners  = this.ingredientToSubstituteListeners.filter((l) => listener !== l );
        }
        return removeListener; 
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

    //Ingredient Substitutions
    addIngredientSubstitutionsListener(listener){
        this.ingredientSubstitutionsListeners.push(listener);
        const removeListener = () => {
            this.ingredientSubstitutionsListeners  = this.ingredientSubstitutionsListeners.filter((l) => listener !== l );
        }
        return removeListener; 
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

    //Filter text 
    addFilterTextListener(listener){
        this.filterTextListeners.push(listener);
        const removeListener = () => {
            this.filterTextListeners  = this.filterTextListeners.filter((l) => listener !== l );
        }
        return removeListener; 
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

const recipeStore = new RecipeStore({filterText: ""});
export default recipeStore;