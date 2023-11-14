function status(request, response) {
  response.status(200).json({ chave: "String passando" });
}

export default status;
