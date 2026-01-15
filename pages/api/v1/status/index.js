function status(request, response) {
  response.status(200).json({ chave: "Olá mundo!" });
}

export default status;
