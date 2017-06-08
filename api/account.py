from connexion import NoContent

accounts = {}


def post(account):
    count = len(accounts)
    account['id'] = count + 1
    account['registered'] = datetime.datetime.now()
    accounts[account['id']] = account
    return account, 201

def patch(id, account):
    id = int(id)
    if accounts.get(id) is None:
        return NoContent, 404
    accounts[id] = account

    return accounts[id]


def delete(id):
    id = int(id)
    if accounts.get(id) is None:
        return NoContent, 404
    del accounts[id]
    return NoContent, 204


def get(id):
    id = int(id)
    if accounts.get(id) is None:
        return NoContent, 404

    return accounts[id]


def search():
    # NOTE: we need to wrap it with list for Python 3 as dict_values is not JSON serializable
    return list(accounts.values())
