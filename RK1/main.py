# используется для сортировки
from operator import itemgetter


class ProgrammingLanguage:
    """ProgrammingLanguage"""

    def __init__(self, id, name):
        self.id = id
        self.name = name


class Operator:
    """Operator"""

    def __init__(self, id, name, syntax, num_of_operands, prog_lang_id):
        self.id = id
        self.name = name
        self.syntax = syntax
        self.num_of_operands = num_of_operands
        self.prog_lang_id = prog_lang_id


class ProgrammingLanguageOperator:
    """
    'Сотрудники отдела' для реализации
    связи многие-ко-многим
    """

    def __init__(self, prog_lang_id, operator_id):
        self.prog_lang_id = prog_lang_id
        self.operator_id = operator_id


# Языки программирования
programming_languages = [
    ProgrammingLanguage(1, 'C++'),
    ProgrammingLanguage(2, 'Python'),
    ProgrammingLanguage(3, 'JavaScript'),
    ProgrammingLanguage(11, 'TypeScript'),
    ProgrammingLanguage(22, 'Java'),
    ProgrammingLanguage(33, 'PascalABC'),
]

# Операторы
operators = [
    Operator(1, 'assignment', '=', 2, 1),
    Operator(2, 'equal', '==', 2, 2),
    Operator(3, 'equal typed', '===', 2, 11),
    Operator(4, 'less then', '<', 2, 3),
    Operator(5, 'greater then', '>', 2, 22),
    Operator(6, 'xor', '^', 2, 1),
    Operator(7, 'and', '&&', 2, 3),
    Operator(8, 'or', '|', 2, 2),
    Operator(9, 'assignment', ':=', 2, 33),
    Operator(10, 'if-else', '? :', 3, 11),
    Operator(11, 'increment', '++', 1, 1),
    Operator(12, 'decrement', '--', 1, 3),
]

prog_lang_operators = [
    ProgrammingLanguageOperator(1, 1),
    ProgrammingLanguageOperator(1, 2),
    ProgrammingLanguageOperator(1, 4),
    ProgrammingLanguageOperator(1, 5),
    ProgrammingLanguageOperator(1, 6),
    ProgrammingLanguageOperator(1, 11),
    ProgrammingLanguageOperator(1, 12),

    ProgrammingLanguageOperator(2, 1),
    ProgrammingLanguageOperator(2, 2),
    ProgrammingLanguageOperator(2, 4),
    ProgrammingLanguageOperator(2, 5),
    ProgrammingLanguageOperator(2, 8),
    ProgrammingLanguageOperator(2, 10),

    ProgrammingLanguageOperator(3, 1),
    ProgrammingLanguageOperator(3, 3),
    ProgrammingLanguageOperator(3, 7),
    ProgrammingLanguageOperator(3, 11),
    ProgrammingLanguageOperator(3, 12),

    ProgrammingLanguageOperator(11, 1),
    ProgrammingLanguageOperator(11, 3),
    ProgrammingLanguageOperator(11, 10),

    ProgrammingLanguageOperator(22, 1),
    ProgrammingLanguageOperator(22, 2),
    ProgrammingLanguageOperator(22, 4),
    ProgrammingLanguageOperator(22, 5),
    ProgrammingLanguageOperator(22, 7),

    ProgrammingLanguageOperator(33, 2),
    ProgrammingLanguageOperator(33, 9),
    ProgrammingLanguageOperator(33, 10),
]


def main():
    """Основная функция"""

    # Соединение данных один-ко-многим
    one_to_many = [(o.name, o.syntax, o.num_of_operands, l.name)
                   for l in programming_languages
                   for o in operators
                   if l.id == o.prog_lang_id]

    # Соединение данных многие-ко-многим
    many_to_many_temp = [(l.name, lo.prog_lang_id, lo.operator_id)
                         for l in programming_languages
                         for lo in prog_lang_operators
                         if l.id == lo.prog_lang_id]

    many_to_many = [(o.name, o.num_of_operands, name)
                    for name, _, operator_id in many_to_many_temp
                    for o in operators if o.id == operator_id]

    print('Задание А1')
    res_11 = sorted(one_to_many, key=itemgetter(3))
    print(res_11)

    print('\nЗадание А2')
    res_12_unsorted = []

    # Перебираем все компьютеры
    for l in programming_languages:
        l_operators = list(filter(lambda i: i[3] == l.name, one_to_many))

        if len(l_operators) > 0:
            l_num_of_operands = [num_of_operands for _, _, num_of_operands, _ in l_operators]
            l_num_of_operands_sum = sum(l_num_of_operands)
            res_12_unsorted.append((l.name, l_num_of_operands_sum))

    res_12 = sorted(res_12_unsorted, key=itemgetter(1), reverse=True)
    print(res_12)

    print('\nЗадание А3')
    res_13 = {}
    # Перебираем все отделы
    for l in programming_languages:
        if 'Java' in l.name:
            l_operators = list(filter(lambda i: i[2] == l.name, many_to_many))
            l_operators_names = [x for x, _, _ in l_operators]
            res_13[l.name] = l_operators_names

    print(res_13)


if __name__ == '__main__':
    main()