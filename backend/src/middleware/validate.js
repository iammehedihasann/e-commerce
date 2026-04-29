export function validate(schema) {
  return (req, _res, next) => {
    const parsed = schema.parse({
      body: req.body,
      params: req.params,
      query: req.query
    });

    req.body = parsed.body ?? req.body;
    req.params = parsed.params ?? req.params;
    req.query = parsed.query ?? req.query;
    next();
  };
}
