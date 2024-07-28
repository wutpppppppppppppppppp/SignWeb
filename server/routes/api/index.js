import S from "fluent-json-schema";

const searchSchema = {
  querystring: S.object().prop("find", S.string().required()),
  response: {
    200: S.object().prop(
      "suggestions",
      S.array().items(
        S.object()
          .prop("name", S.string())
          .prop("type", S.string())
          .prop("category", S.string())
      )
    ),
  },
};

export default async function (fastify, opts) {
  fastify.get(
    "/search",
    { schema: searchSchema },
    async function (request, reply) {
      try {
        const query = request.query.find;
        const regex = new RegExp(`^${query}`, "i");
        const categoriesCollection = fastify.mongo.client
          .db("sample_sign")
          .collection("categories");

        // Fetch categories and vocabularies using MongoDB query
        const categories = await categoriesCollection
          .find({
            $or: [
              { category: { $regex: regex } },
              { "vocabularies.name": { $regex: regex } },
            ],
          })
          .toArray();
        // console.log("fetched", categories);
        let categorySuggestions = [];
        let vocabularySuggestions = [];

        // Process each category and its vocabularies
        categories.forEach((category) => {
          if (regex.test(category.category)) {
            categorySuggestions.push({
              name: category.category,
              type: "category",
              category: null,
            });
          }

          category.vocabularies.forEach((vocab) => {
            if (regex.test(vocab.name)) {
              vocabularySuggestions.push({
                name: vocab.name,
                type: "vocabulary",
                category: category.category, // Use category name here
              });
            }
          });
        });

        // Combine and limit suggestions
        const maxSuggestions = 10;
        let suggestions = [...categorySuggestions, ...vocabularySuggestions];
        // console.log(suggestions);
        suggestions = suggestions.slice(0, maxSuggestions);

        // fastify.log.info(`Fetched suggestions: ${JSON.stringify(suggestions)}`);
        reply.send({ suggestions });
      } catch (err) {
        fastify.log.error(err, "Failed to fetch suggestions");
        reply.code(500).send({ error: "Failed to fetch suggestions" });
      }
    }
  );
}
