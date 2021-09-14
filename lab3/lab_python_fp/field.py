# Пример:
# goods = [
#    {'title': 'Ковер', 'price': 2000, 'color': 'green'},
#    {'title': 'Диван для отдыха', 'price': 5300, 'color': 'black'}
# ]
# field(goods, 'title') должен выдавать 'Ковер', 'Диван для отдыха'
# field(goods, 'title', 'price') должен выдавать {'title': 'Ковер', 'price': 2000}, {'title': 'Диван для отдыха', 'price': 5300}

def field(items, *args):
    assert len(args) > 0
    numOfArgs = len(args)
    j = 0
    print('------------')
    for i in items:
        for key in i:
            #while j < numOfArgs:
            if key == args[j]:
                print(i[key])
                j = j + 1
        j = 0
    print('------------')
    print()



