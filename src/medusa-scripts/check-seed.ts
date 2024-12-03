export default async function checkSeedData({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

  const query = container.resolve(ContainerRegistrationKeys.QUERY);

  const { data: products } = await query.graph({
    entity: "product",
    fields: ["id", "title"],
  });

  if (products.length > 0) {
    logger.info("Have seeded data");
    return true;
  }
  logger.info("No seeded data");
  return false;
}
