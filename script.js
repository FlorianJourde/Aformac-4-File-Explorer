$(document).ready(function () {
  let pathReference = "";

  let getFiles = function (pathValue) {
    $.post(
      "function.php",
      {
        path: pathValue,
      },
      function (data) {
        $(".pageContent").html(data);
        $(".path").click(function () {
          let currentPathValue = pathReference;
          if (currentPath !== "/") {
            newPath = currentPathValue + "/" + this.id;
          } else {
            newPath = currentPathValue + this.id;
          }
          pathReference = newPath;
          getFiles(newPath + "/");
          generateNav();
        });
      }
    );
  };

  getFiles("/");

  let generateNav = function () {
    let currentPath = pathReference;
    let pathToArray = currentPath.split("/");
    $(".nav").html("");
    for (i = 0; i < pathToArray.length; i++) {
      $(".nav").append(
        "<button class='btn-nav' id='" + i + "'>" + pathToArray[i] + "</button>"
      );
      $(".btn-nav").click(function () {
        let index = parseInt(this.id);
        let cutArray = pathToArray.slice(0, index + 1);
        let newPath = cutArray.join("/");
        pathReference = newPath;
        generateNav();
        getFiles(newPath + "/");
      });
    }
  };

  $("#previous").click(function () {
    let currentPathValue = pathReference;
    let pathToArray = currentPathValue.split("/");
    pathToArray.pop();
    let newPath = pathToArray.join("/");
    pathReference = newPath;
    getFiles(newPath + "/");
    generateNav();
  });
});
