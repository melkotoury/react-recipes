exports.resolvers = {
    Query: {
        getAllRecipes: async (root, args, {Recipe}) => {
            return await Recipe.find(); // will return array of all recipes
        }
    },
    Mutation: {
        addRecipe: async (root, {name, description, category, instructions , username}, {Recipe}) => {
            return await new Recipe({
                name,
                description,
                category,
                instructions,
                username
            }).save();

        }
    }
};