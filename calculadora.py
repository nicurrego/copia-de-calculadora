import tkinter as tk
from tkinter import messagebox

# Function to perform arithmetic operations
def operar(n1, simbolo, n2):
    try:
        if simbolo == "+":
            resultado = n1 + n2
        elif simbolo == "-":
            resultado = n1 - n2
        elif simbolo == "*":
            resultado = n1 * n2
        elif simbolo == "/":
            if n2 == 0:
                raise ValueError("Division by zero is not allowed.")
            resultado = n1 / n2
        else:
            resultado = "Invalid Symbol"
        return resultado
    except Exception as e:
        messagebox.showerror("Error", str(e))
        return None

# Function to handle button click events
def on_button_click(symbol):
    global expression
    if symbol == "C":
        expression = ""
    elif symbol == "=":
        try:
            result = eval(expression)
            expression = str(result)
        except Exception as e:
            messagebox.showerror("Error", "Invalid expression")
            expression = ""
    else:
        expression += str(symbol)
    equation.set(expression)

# Creating the calculator UI with tkinter
root = tk.Tk()
root.title("Calculator")

expression = ""
equation = tk.StringVar()

input_field = tk.Entry(root, textvariable=equation, font=('Helvetica', 20), bd=10, insertwidth=4, width=14, borderwidth=4)
input_field.grid(row=0, column=0, columnspan=4)

buttons = [
    'C', '(', ')', '/',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '+/-', '0', '.', '='
]

row = 1
col = 0

for button in buttons:
    action = lambda x=button: on_button_click(x)
    tk.Button(root, text=button, padx=20, pady=20, font=('Helvetica', 20), command=action).grid(row=row, column=col)
    col += 1
    if col > 3:
        col = 0
        row += 1

root.mainloop()
