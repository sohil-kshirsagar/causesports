from connexion import NoContent

parents = {}


def post(parent):
    count = len(parents)
    parent['id'] = count + 1
    parent['registered'] = datetime.datetime.now()
    parents[parent['id']] = parent
    return parent, 201

def patch(id, parent):
    id = int(id)
    if parents.get(id) is None:
        return NoContent, 404
    parents[id] = parent

    return parents[id]


def delete(id):
    id = int(id)
    if parents.get(id) is None:
        return NoContent, 404
    del parents[id]
    return NoContent, 204


def get(id):
    id = int(id)
    if parents.get(id) is None:
        return NoContent, 404

    return parents[id]


def search():
    # NOTE: we need to wrap it with list for Python 3 as dict_values is not JSON serializable
    return list(parents.values())
