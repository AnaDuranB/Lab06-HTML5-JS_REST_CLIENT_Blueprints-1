var BlueprintApp = (function () {
    var blueprints = [];
    var authorName = "";

    var setAuthorName = function (newAuthorName) {
        authorName = newAuthorName;
        document.getElementById("selectedAuthor").innerText = authorName;
    };

    var updateTotalPoints = function () {
        var totalPoints = blueprints.reduce(function (acc, blueprint) {
            return acc + blueprint.points.length;
        }, 0);
        $("#totalPoints").text(totalPoints);
    };

    var renderTable = function (blueprintList) {
        var tableBody = blueprintList.map(function (blueprint) {
            return `
                <tr>
                    <td>${blueprint.name}</td>
                    <td>${blueprint.numberOfPoints}</td>
                </tr>
            `;
        }).join("");
        $("#blueprintsTable tbody").html(tableBody);
    };

    var updateBlueprintsByAuthor = function (author) {
        apimock.getBlueprintsByAuthor(author, function (data) {
            // Almacenamos los planos obtenidos en la variable privada blueprints
            blueprints = data;

            // Transformar los planos a una lista de objetos con nombre y número de puntos
            var transformedBlueprints = blueprints.map(function (blueprint) {
                return {
                    name: blueprint.name,
                    numberOfPoints: blueprint.points.length
                };
            });

            renderTable(transformedBlueprints);

            var totalPoints = blueprints.reduce(function (acc, blueprint) {
                return acc + blueprint.points.length;
            }, 0);

            // Actualizar el campo de total de puntos en el DOM usando jQuery
            $("#totalPoints").text(totalPoints);
        });
    };

    return {
        setAuthorName: setAuthorName,
        updateBlueprintsByAuthor: updateBlueprintsByAuthor
    };
})();

$("#getBlueprintsBtn").on("click", function () {
    var authorInput = $("#authorInput").val();
    if (authorInput) {
        BlueprintApp.setAuthorName(authorInput);
        BlueprintApp.updateBlueprintsByAuthor(authorInput);
    } else {
        alert("Por favor ingrese un nombre de autor.");
    }
});
