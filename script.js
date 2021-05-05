function cancelForm() {
  document.querySelector(".cancel").addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector(".modal-overlay").classList.remove("active");
  });
}

function displayForm() {
  document.querySelector(".new").addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector(".modal-overlay").classList.add("active");
  });
}

function createTransaction() {
  document.querySelector("#form-submit").addEventListener("submit", (event) => {
    event.preventDefault();
    let description = document.querySelector("#description").value;
    let amount = document.querySelector("#amount").value;
    let date = document.querySelector("#date").value;
    fetch("http://localhost:1337/dev-finances", {
      method: "POST",
      body: JSON.stringify({
        description: description,
        value: amount,
        date: date,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    .then((response) => response.json())
    .then(() => window.location.reload());
  });
}

async function renderTransaction() {
  const data = await fetchGet();
  let render = document.querySelector("#render-data");
  const tr = data.map((item) => {
    return `
                <tr>
                    <td class="description">${item.description}</td>
                    <td class="${
                      Math.sign(item.value) == -1 ? "expense" : "income"
                    }">R$: ${item.value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                    })}</td>
                    <td class="date">${new Date(item.date).toLocaleDateString(
                      "pt-br"
                    )}</td>
                    <td>
                        <button class="button-delete" value="${item.id}">
                          <img src="./assets/minus.svg" alt="remover transação">
                        </button>
                    </td>
                </tr>
            `;
  });

  render.innerHTML = tr.join(" ");
  fetchDelete();
}

async function fetchGet() {
  const response = await fetch("http://localhost:1337/dev-finances", {
    method: "GET",
  });
  const data = await response.json();
  return data;
}

function fetchDelete() {
  let buttonDelete = document.querySelectorAll('.button-delete');
  buttonDelete.forEach(button => {
    button.addEventListener('click', async (event) => {
      event.preventDefault();
      let id = button.getAttribute('value')
      await fetch(`http://localhost:1337/dev-finances/${id}`, {
        method: 'DELETE'
      })
      window.location.reload()
    })
  })
}

renderTransaction();
displayForm();
cancelForm();
createTransaction();

