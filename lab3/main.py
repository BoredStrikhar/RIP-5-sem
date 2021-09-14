from lab_python_fp.field import field


def main():
    goods = [
        {'title': 'Ковер', 'price': 2000, 'color': 'green'},
        {'title': 'Диван для отдыха', 'price': 5300, 'color': 'black'}
    ]
    field(goods, 'title') # 'Ковер', 'Диван для отдыха'
    field(goods, 'title', 'price') # {'title': 'Ковер', 'price': 2000}, {'title': 'Диван для отдыха', 'price': 5300}


if __name__ == '__main__':
    main()

