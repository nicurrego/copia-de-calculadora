<?php

// Function to perform arithmetic operations
function operar($n1, $simbolo, $n2) {
    switch ($simbolo) {
        case '+':
            return $n1 + $n2;
        case '-':
            return $n1 - $n2;
        case '*':
            return $n1 * $n2;
        case '/':
            if ($n2 == 0) {
                return "Error: Division by zero is not allowed.";
            }
            return $n1 / $n2;
        default:
            return "Invalid Symbol";
    }
}

// Handling button click event through form submission
$expression = "";
$result = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['button'])) {
        $button = $_POST['button'];

        if ($button === 'C') {
            $expression = "";
        } elseif ($button === '=') {
            try {
                // Evaluate the expression
                eval("\$result = " . $_POST['expression'] . ";");
                $expression = $result;
            } catch (Exception $e) {
                $result = "Error: Invalid expression";
                $expression = "";
            }
        } else {
            $expression = $_POST['expression'] . $button;
        }
    }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculator</title>
    <style>
        .calculator {
            width: 200px;
            margin: 100px auto;
        }
        input[type="text"] {
            width: 100%;
            font-size: 24px;
            padding: 10px;
            text-align: right;
            margin-bottom: 10px;
        }
        .button {
            width: 25%;
            height: 50px;
            font-size: 20px;
        }
    </style>
</head>
<body>
<div class="calculator">
    <form method="post">
        <input type="text" name="expression" value="<?php echo htmlspecialchars($expression); ?>" readonly>
        <br>
        <?php
        $buttons = [
            'C', '(', ')', '/',
            '7', '8', '9', '*',
            '4', '5', '6', '-',
            '1', '2', '3', '+',
            '+/-', '0', '.', '='
        ];

        foreach ($buttons as $button) {
            echo "<button class='button' name='button' value='" . htmlspecialchars($button) . "'>" . htmlspecialchars($button) . "</button>";
            if (in_array($button, ['/', '*', '-', '+', '='])) {
                echo "<br>";
            }
        }
        ?>
    </form>
</div>
</body>
</html>
