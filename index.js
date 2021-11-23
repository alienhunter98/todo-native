let taskNum = document.querySelectorAll('.task-wrapper').length
if(localStorage.todos == '[]'){
  var todos = []
}else{
  var todos = JSON.parse(localStorage.getItem('todos')) 
}

function createTask(){
  let taskValue = document.querySelector('.create-task input').value
  const place = document.querySelector('.tasks')
  const toDo = {
    title: taskValue,
    completed:false,
    id:Date.now()
  }
  todos.push(toDo)
  place.innerHTML = ''
  todos.map(todo => {
    if(todo && todo.completed){
      let newTaskChecked = `<div class="task-wrapper checked" data-id="${todo.id}" style="margin-bottom:20px"><div class="left-side"><input type="checkbox" checked='checked'><p>${todo.title}</p></div><button>Удалить</button></div>`
      place.insertAdjacentHTML('afterbegin',newTaskChecked) 
    }else{
      let newTask = `<div class="task-wrapper" data-id="${todo.id}" style="margin-bottom:20px"><div class="left-side"><input type="checkbox"><p>${todo.title}</p></div><button>Удалить</button></div>`
      place.insertAdjacentHTML('afterbegin',newTask) 
    }
  })
  taskValue = ''  
}
function LsItems(){
  const place = document.querySelector('.tasks')
  LSTodos.map(todo => {
    if(todo && todo.completed){
      let newTaskChecked = `<div class="task-wrapper checked" data-id="${todo.id}" style="margin-bottom:20px"><div class="left-side"><input type="checkbox" checked='checked'><p>${todo.title}</p></div><button>Удалить</button></div>`
      place.insertAdjacentHTML('afterbegin',newTaskChecked) 
    }else{
      let newTask = `<div class="task-wrapper" data-id="${todo.id}" style="margin-bottom:20px"><div class="left-side"><input type="checkbox"><p>${todo.title}</p></div><button>Удалить</button></div>`
      place.insertAdjacentHTML('afterbegin',newTask) 
    }
  })
}
function counter(){
  let taskNum = document.querySelectorAll('.task-wrapper').length
  let checkedNum = checkbox.getElementsByClassName('checked').length
  if(taskNum === 0){
    document.querySelector('.after-desc h2').innerHTML = 'У вас нет задач'
  }else if(taskNum === 1){
    document.querySelector('.after-desc h2').innerHTML = 'У вас ' + taskNum +  ' задача' + ' и ' + checkedNum + ' из них завершена'
  }else if(taskNum < 5 || taskNum > 1){
    document.querySelector('.after-desc h2').innerHTML = 'У вас ' + taskNum +  ' задачи' + ' и ' + checkedNum + ' из них завершены'
  }else{
    document.querySelector('.after-desc h2').innerHTML = 'У вас ' + taskNum +  ' задач' + ' и ' + checkedNum + ' из них завершены'
  }
}

document.querySelector('.create-task button').addEventListener('click',function(){
  if(document.querySelector('.create-task input').value ==='' || document.querySelector('.create-task input').value === null){
    return
  }else{
    createTask()
    counter()
    document.querySelector('.create-task input').value = ''
    localStorage.setItem('todos', JSON.stringify(todos))
  }
})
let allOfTasks = document.querySelector('.tasks')
allOfTasks.addEventListener('click', e=> {
  if(e.target.tagName == 'BUTTON'){
    let removeId = e.target.closest('.task-wrapper').dataset.id
    for (var i = 0; i < todos.length; i++) {
        var obj = todos[i];
    
        if (removeId.indexOf(obj.id) !== -1) {
          todos.splice(i, 1);
        }
    }
    e.target.closest('.task-wrapper').remove()
    counter()
    localStorage.setItem('todos', JSON.stringify(todos))
  }
})
let checkbox = document.querySelector('.tasks')
checkbox.addEventListener('click',function(e){
  if(e.target.tagName == 'INPUT'){
    const id = e.target.closest('.task-wrapper').dataset.id
    if(e.target.checked){
      e.target.closest('.task-wrapper').classList.add('checked')
      todos = todos.map(todo => {
        if(todo.id == id){
          todo.completed = true
        }
        return todo
      })
    }else{
      todos = todos.map(todo => {
        if(todo.id == id){
          todo.completed = false
        }
        return todo
      })
      e.target.closest('.task-wrapper').classList.remove('checked')
    }
    console.log(todos)
    localStorage.setItem('todos', JSON.stringify(todos))
  }
  counter()
})
const LSTodos = JSON.parse(localStorage.getItem('todos'))
if(LSTodos && LSTodos != null){
  LsItems(LSTodos)
  counter()
}