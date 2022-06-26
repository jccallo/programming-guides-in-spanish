// se definen antes de la instancia raíz de Vue
// componente todo-item 
Vue.component('todo-item', {
   props: ['todo'],
   template: `
      <div class="todo-item">
         <span>Id: {{todo.id}}</span>
         <span>Text: {{todo.text}}</span>
      </div>
   `
})

// instancia raíz de Vue
var app = new Vue({
   el: '#app',
   data: {
      // introduccion
      title: 'Curso VueJS',
      firstName: 'Armando',
      lastName: 'Morales',
      city: 'Lima',
      isMarried: true,
      text: '',
      fruits: ['Apple', 'Banana', 'Orange'],
      groceryList: [
         { id: 0, text: 'Vegetales' },
         { id: 1, text: 'Queso' },
         { id: 2, text: 'Cualquier otra cosa que se supone que los humanos coman' }
      ],
      object: {
         primerNombre: 'John',
         apellido: 'Doe',
         edad: 30
      },

      // sintaxis
      rawHtml: '<span style="color: red">Esto debe ser rojo.</span>',
      dynamicId: 'idDinamico',
      isButtonDisabled: true,
      isActive: true,
      hasError: false,
      classObject: {
         active: true,
         'text-danger': false
      },
      activeClass: 'active',
      errorClass: 'text-danger',
      activeColor: 'red',
      fontSize: 30,

      // rederizacion
      type: 'A'
   },
   methods: {
      myDetails: function () {
         return 'I am ' + this.firstName + ' ' + this.lastName;
      },
      setMarried: function () {
         if (this.isMarried)
            this.isMarried = false
         else
            this.isMarried = true
      }
   },
   computed: {
      // propiedad computada: depende de una propiedad
      reversedFirstName: function () {
         return this.firstName.split('').reverse().join('')
      },
      // setter computado
      fullName: {
         // se llama cuando se usa su valor
         get: function () {
            return this.firstName + ' ' + this.lastName
         },
         // se llama cuando se cambia de valor
         set: function (newValue) {
            var names = newValue.split(' ')
            this.firstName = names[0]
            this.lastName = names[names.length - 1]
         }
      }
   },
   watch: {
      // cada vez que firstName cambie, esta función será ejecutada
      // podemos hacer uso del nuevo y viejo valor
      firstName: function (newQuestion, oldQuestion) {
         console.log(newQuestion);
         console.log(oldQuestion);
      }
   }
});