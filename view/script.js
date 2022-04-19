(async () => {
  const response = await fetch("http://localhost:8000/api/students");
  console.log("ok", response);
  const data = await response.json();
  console.log(data);
})();
