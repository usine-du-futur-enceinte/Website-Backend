import Example from "../models/example.model";

export async function getExamplesByName(name: string) {
  const examples = await Example.find({
    test: { $regex: name, $options: "i" },
  });

  return examples;
}