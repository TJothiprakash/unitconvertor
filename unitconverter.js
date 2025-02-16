<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Unit Converter</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin: 50px;
        }
        .container {
            max-width: 400px;
            margin: auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 10px;
            box-shadow: 2px 2px 10px rgba(0,0,0,0.1);
        }
        select, input, button {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <h2>Unit Converter</h2>
    <div class="container">
        <label for="category">Choose a category:</label>
        <select id="category" onchange="updateUnits()">
            <option value="length">Length</option>
            <option value="weight">Weight</option>
            <option value="temperature">Temperature</option>
        </select>

        <input type="number" id="inputValue" placeholder="Enter value" />
        
        <label for="fromUnit">From:</label>
        <select id="fromUnit"></select>

        <label for="toUnit">To:</label>
        <select id="toUnit"></select>

        <button onclick="convert()">Convert</button>

        <h3>Result: <span id="result">-</span></h3>
    </div>

    <script>
        const units = {
            length: ["millimeter", "centimeter", "meter", "kilometer", "inch", "foot", "yard", "mile"],
            weight: ["milligram", "gram", "kilogram", "ounce", "pound"],
            temperature: ["Celsius", "Fahrenheit", "Kelvin"]
        };

        function updateUnits() {
            const category = document.getElementById("category").value;
            const fromUnit = document.getElementById("fromUnit");
            const toUnit = document.getElementById("toUnit");
            fromUnit.innerHTML = toUnit.innerHTML = "";
            units[category].forEach(unit => {
                let option1 = new Option(unit, unit);
                let option2 = new Option(unit, unit);
                fromUnit.add(option1);
                toUnit.add(option2);
            });
        }

        function convert() {
            const value = parseFloat(document.getElementById("inputValue").value);
            const from = document.getElementById("fromUnit").value;
            const to = document.getElementById("toUnit").value;
            const category = document.getElementById("category").value;
            let result = value;
            
            if (category === "length") {
                const conversionFactors = {
                    millimeter: 0.001, centimeter: 0.01, meter: 1, kilometer: 1000,
                    inch: 0.0254, foot: 0.3048, yard: 0.9144, mile: 1609.34
                };
                result = value * (conversionFactors[to] / conversionFactors[from]);
            } else if (category === "weight") {
                const conversionFactors = {
                    milligram: 0.001, gram: 1, kilogram: 1000,
                    ounce: 28.3495, pound: 453.592
                };
                result = value * (conversionFactors[to] / conversionFactors[from]);
            } else if (category === "temperature") {
                if (from === "Celsius" && to === "Fahrenheit") result = (value * 9/5) + 32;
                else if (from === "Celsius" && to === "Kelvin") result = value + 273.15;
                else if (from === "Fahrenheit" && to === "Celsius") result = (value - 32) * 5/9;
                else if (from === "Fahrenheit" && to === "Kelvin") result = (value - 32) * 5/9 + 273.15;
                else if (from === "Kelvin" && to === "Celsius") result = value - 273.15;
                else if (from === "Kelvin" && to === "Fahrenheit") result = (value - 273.15) * 9/5 + 32;
            }

            document.getElementById("result").innerText = result.toFixed(2);
        }

        updateUnits();
    </script>
</body>
</html>
