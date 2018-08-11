function getArticles() {
//Home
    $.getJSON('/articles', function(data) {
        for(var i = 0; i < 21; i++) {
            // Generate 20 bootstrap cards
            var card = $('<div>');
            card.addClass('card');
            
            var cardBody = $('<div>');
            cardBody.addClass('card-body');
            
            var cardTitle = $('<h5>');
            cardTitle.addClass('card-title');
            cardTitle.text(data[i].title);
            
            var cardLink = $('<a>');
            cardLink.attr('href', data[i].link);
            cardLink.addClass('btn btn-warning');
            cardLink.text("View Article");
            
            var cardSave = $('<a>');
            cardSave.attr('href', '/saveArticle');
            cardSave.attr('data-id', data[i]._id);
            cardSave.addClass('btn btn-danger save');
            cardSave.text("Save Article");
            
            //Appending elements
            card.append(cardBody, cardTitle, cardLink, cardSave)
            //Appending card to DOM
            $('#articles').append(card)
        }
    });
}
function getSaved() {
//Saved
    $.getJSON('/savedArticles', function(data) {
        for(var i = 0; i < data.length; i++) {
            // Generate 20 bootstrap cards
            var card = $('<div>');
            card.addClass('card');
            
            var cardBody = $('<div>');
            cardBody.addClass('card-body');
           
            var cardTitle = $('<h5>');
            cardTitle.addClass('card-title');
            cardTitle.text(data[i].title);
            
            var cardLink = $('<a>');
            cardLink.attr('href', data[i].link);
            cardLink.addClass('btn btn-warning');
            cardLink.text("View Article");
            
            var cardDelete = $('<a>');
            cardDelete.attr('data-id', data[i]._id);
            cardDelete.attr('href', '/deleteArticle/' + data[i]._id);
            cardDelete.addClass('btn btn-danger delete');
            cardDelete.text("Remove Article");
            
            var cardComment = $('<a>');
            // cardComment.attr('href', '/addComment');
            cardComment.attr('data-toggle', 'modal');
            cardComment.attr('data-target', 'commentModal');
            cardComment.addClass('btn btn-info comment');
            cardComment.text('Add Comment');
            
            //Appending elements
            card.append(cardBody, cardTitle, cardLink, cardDelete, cardComment)
            //Appending card to DOM
            $('#savedArticles').append(card)
        }
    });
}


//Event handlers
$('body').on('click', '.save', function(e) {
    e.preventDefault();
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/savedArticles/" + thisId
    })
    .then(function(data) {
        console.log("Post made");
    })
})

$('body').on('click', '.delete', function(e) {
    e.preventDefault();
    var deleteId = $(this).attr("data-id");
    $.ajax({
        method: "GET",
        url: "/deleteArticle/" + deleteId
    })
    .then(function(data) {
        console.log("Posts no mo")
        $('#savedArticles').empty();
        getSaved();
    })
})

// $('body').on('click', '.addComment')


getArticles();
getSaved();