var config = {
  apiKey: "AIzaSyCfbk-gEyWpJPVBrOXxUgkZdLE0-RkDBps",
  authDomain: "library-2ed16.firebaseapp.com",
  databaseURL: "https://library-2ed16.firebaseio.com"
}
firebase.initializeApp(config)

var booksRef = firebase.database().ref('books')

var app =
new Vue({
	el: '#app',
	data: {
		choice: 'Customer',
		book: {
			name: '',
			cover: '',
			taken: false
		}
	},
	firebase: {
    	books: booksRef
  	},
	methods: {
		makeActive: function(val) {
            this.choice = val;
        },
        isActiveTab: function(val) {
          return this.choice === val;
        },
        takeBook: function(book) {
        	swal({
			  title: 'Are you sure ?',
			  text: "Do you want to take this book ?",
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Yes!'
			}).then(function () {
				booksRef.child(book['.key']).update({"taken": true});
				swal(
				  'Successful',
				  'Book taken Successfully!!!',
				  'success'
				);
			});
        },
        returnBook: function(book) {
        	if(book.taken)
	        	swal({
				  title: 'Are you sure ?',
				  text: "Is the book successfully returned ?",
				  type: 'warning',
				  showCancelButton: true,
				  confirmButtonColor: '#3085d6',
				  cancelButtonColor: '#d33',
				  confirmButtonText: 'Yes!'
				}).then(function () {
					booksRef.child(book['.key']).update({"taken": false});
					swal(
					  'Successful',
					  'Book returned Successfully!!!',
					  'success'
					);
				});
        },
        addBook: function () {
        	if(this.book.name.trim() != '' && this.book.cover.trim() != '' ) {
        		booksRef.push(this.book);
				swal(
				  'Successful',
				  'Book Added!',
				  'success'
				);
				this.book = {
					name: '',
					cover: ''
				};
        	}
        	else {
        		swal(
				  'Error',
				  'Fill All Fields',
				  'error'
				);
        	}
		}
	}
});
