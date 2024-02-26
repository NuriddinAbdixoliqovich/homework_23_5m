const API = "https://dummyjson.com/products";

let isEdit = false;



const form = document.getElementById("form");

'https://dummyjson.com/products'
async function fetchProducts(limit = 10, skip = 0) {
    const response = await fetch(`https://dummyjson.com/products?limit=${limit}&${skip}`);

    const result = await response.json();
    console.log(result.products);
    let tbody = document.querySelector("tbody")
    tbody.innerHTML = "";

    result.products.forEach((products, index) => {
        tbody.innerHTML += `<tr>
            <td>${index + 1}</td>
            <td id = "firstName">${products.brand}</td>
            <td>${products.description}</td>
            <td>${products.price + " $"}</td>
            <td class = "text-center"><i onclick = "editPost(${products.id})" class="fa-regular fa-pen-to-square me-2"></i><i onclick = "deletePost(${products.id})" class="fa-solid fa-trash-can"></i></td>
        </tr>`
        let deleteElement = document.getElementsByClassName(".fa-solid")
        deleteElement.style = "cursor: pointer;"
    })

}

fetchProducts();



document.addEventListener('click', (e) => {
    if (e.target.classList[0] === 'fa-solid'){
        e.target.parentElement.parentElement.remove();
       


    }
})


let createPostForm = document.forms["createPostForm"];

createPostForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = createPostForm["brand"].value;
  const body = createPostForm["description"].value;
  const userId = createPostForm["price"].value;

  const data = {
    brand,
    description,
    price,
  };

  if (isEdit) {
    updatePost(data);
  } else {
    createPost(data);
  }
  createPostForm.reset();

  //   console.log("data", data);
});

function editPost(id) {
  fetch(`${API}/${id}`)
    .then((response) => response.json())
    .then((res) => {
      idData = id;
      createPostForm["brand"].value = res.brand;
      createPostForm["description"].value = res.description;
      createPostForm["price"].value = res.price;
      isEdit = true;
    });
}
function updatePost(data) {
  fetch(`${API}/${idData}`, {
    method: "PUT",
    body: JSON.stringify({
      id: idData,
      ...data,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      getPosts(API);
      isEdit = false;
    });
}

function createPost(data) {
  fetch(API, {
    method: "POST",
    body: JSON.stringify(data),
    
  })
    .then((res) => res.json())
    .then((response) => {
      getPosts(API);
    })
    .catch((error) => {
      console.log(error);
    });
}
console.log();


let showMoreBtn = document.getElementById("showMore");

showMoreBtn.addEventListener("click", () => {
  fetchProducts(30, 0);
  
});

// fetch('https://dummyjson.com/products/firstname')
// .then(res => res.json())
// .then(console.log);

