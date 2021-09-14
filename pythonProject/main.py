import sys
import math


def get_coef(index, prompt):
    try:
        coef_str = sys.argv[index]
    except:
        print(prompt)
        while True:
            coef_str = input()
            if coef_str.lstrip('-+').isdigit():
                 break
            else:
                print('Введите число!')

    coef = float(coef_str)
    return coef


def get_roots(a, b, c):
    result = []
    D = b * b - 4 * a * c
    if D == 0.0:
        root = -b / (2.0 * a)
        if root >= 0.0:
            result.extend([math.sqrt(root), -math.sqrt(root)])
    elif D > 0.0:
        sqD = math.sqrt(D)
        temp1 = (-b + sqD) / (2.0 * a)
        temp2 = (-b - sqD) / (2.0 * a)
        if temp1 > 0.0:
            root1 = -1*math.sqrt((-b + sqD) / (2.0 * a))
            root2 = math.sqrt((-b + sqD) / (2.0 * a))
            result.append(root1)
            result.append(root2)
        elif temp1 == 0.0:
            result.append(0)
        if temp2 > 0.0:
            root3 = -1*math.sqrt((-b - sqD) / (2.0 * a))
            root4 = math.sqrt((-b - sqD) / (2.0 * a))
            result.append(root3)
            result.append(root4)
        elif temp2 == 0.0:
            result.append(0)
    return result


def main():
    a = get_coef(1, 'Введите коэффициент А:')
    b = get_coef(2, 'Введите коэффициент B:')
    c = get_coef(3, 'Введите коэффициент C:')
    # Вычисление корней
    roots = get_roots(a, b, c)
    # Вывод корней
    len_roots = len(roots)
    if len_roots == 0:
        print('Нет корней')
    elif len_roots == 1:
        print('Один корень: {}'.format(roots[0]))
    elif len_roots == 2:
        print('Два корня: {} и {}'.format(roots[0], roots[1]))
    elif len_roots == 3:
        print('Три корня: {} и {} и {}'.format(roots[0], roots[1], roots[2]))
    elif len_roots == 4:
        print('Четыре корня: {} и {} и {} и {}'.format(roots[0], roots[1], roots[2], roots[3]))


# Если сценарий запущен из командной строки
if __name__ == "__main__":
    main()