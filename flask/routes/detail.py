from flask import Blueprint, jsonify

recipe_blueprint = Blueprint('recipe', __name__)


@recipe_blueprint.route('/api/json/v1/recipe/<id>', methods=['GET'])
def get_recipe_id(id):
    if id == '1001':
        detail = [
            {
                "idOutfit": "1001",
                "strOutfit": "Beef and Mustard Pie",
                "strCategory": "Kentang",
                "strDescription": "",
                "strOutfitThumb": "http://192.168.71.39:5000/img/outfit-1.jpg",
                "strColor1":"",
                "strColor2":"",
                "strColor3":"",
            }
        ]
    elif id == '1002':
        detail = [
            {
                "idOutfit": "1001",
                "strOutfit": "Beef and Mustard Pie",
                "strCategory": "Kentang",
                "strDescription": "",
                "strOutfitThumb": "http://192.168.71.39:5000/img/outfit-1.jpg",
                "strColor1":"",
                "strColor2":"",
                "strColor3":"",
            }
        ]
    else:
        return jsonify({"message": "Detail not found"})

    return jsonify({"detail": detail})