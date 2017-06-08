from connexion import NoContent

accounts = {
    '1' : {
        'accountId' : '1',
        'parentIdArray' : [],
        'emergContArrray': [],
        'playerIdArray' : [],
    },
    '2' : {
        'accountId' : '2',
        'parentIdArray' : [],
        'emergContArrray' : [],
        'playerIdArray' : [],
    },
};


def post(account):
    count = len(accounts)
    account['id'] = count + 1
    account['registered'] = datetime.datetime.now()
    accounts[account['id']] = account
    return account, 201

def patch(id, account):
    if accounts.get(id) is None:
        return NoContent, 404
    accounts[id] = account

    return accounts[id]


def delete(id):
    if accounts.get(id) is None:
        return NoContent, 404
    del accounts[id]
    return NoContent, 204


def get(id):
    if accounts.get(id) is None:
        return NoContent, 404

    return accounts[id]

def get():
    return accounts.values()

def search():
    # NOTE: we need to wrap it with list for Python 3 as dict_values is not JSON serializable
    return list(accounts.values())
