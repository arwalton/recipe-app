
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

    //Ingredients - used by FilterableIngredientsList
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

    //Selected Ingredients - used by FilterableIngredientsList
    addSelectedIngredientListener (listener) {
        this.selectedIngredientListeners.push(listener);
        const removeListener = () => {
            this.selectedIngredientListeners  = this.selectedIngredientListeners.filter((l) => listener !== l );
        }
        return removeListener; 
    }

    updateSelectedIngredients(ingredientToUpdate){
        this.ids = [];
        this.state.selectedIngredients.forEach(ingredient => {
            this.ids.push(ingredient.id);
        });

        if(this.ids.indexOf(ingredientToUpdate.id) === -1){
            this.state.selectedIngredients.push(ingredientToUpdate);
        }else{
            this.state.selectedIngredients = this.state.selectedIngredients.filter((ingredient) => {
                return ingredient.id !== ingredientToUpdate.id;
            })
        };
        for (const listener of this.selectedIngredientListeners){
            listener(this.state.selectedIngredients);
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

    //Filter text - used by FilterableIngredientsList
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

const recipeStore = new RecipeStore({filterText: "",
                                     selectedIngredients: [],
                                     recipes: []});
export default recipeStore;