
class RecipeStore{
    constructor(initialState) {
        this.state = initialState;
    }

    setIngredients (state) {
        this.state.ingredients = state;
    }

    getIngredients () {
        return this.state.ingredients;
    }

    setSelectedIngredients (state) {
        this.state.selectedIngredients = state;
    }

    getSelectedIngredients (state) {
        return this.state.selectedIngredients;
    }

    setRecipes (state) {
        this.state.recipes = state;
    }

    getRecipes () {
        return this.state.recipes;
    }

    setIngredientToSubstitute(state){
        this.state.ingredientToSubstitute = state;
    }

    getIngredientToSubstitute(){
        return this.state.ingredientToSubstitute;
    }

    setIngredientSubstitutions(state){
        this.state.ingredientSubstitutions = state;
    }

    getIngredientSubstitutions(){
        return this.state.ingredientSubstitutions;
    }
}

const recipeStore = new RecipeStore({});
export default recipeStore;