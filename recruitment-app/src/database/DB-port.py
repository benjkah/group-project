def process_txt_file(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    formatted_lines = []
    
    for line in lines:
        parts = line.strip().split("\t")  # Split by tab
        parts = parts[1:]  # Remove the first number

        # Replace \N with NULL for SQL syntax
        parts = ["NULL" if part == r"\N" else f"'{part}'" for part in parts]

        # Format as (value1, value2, value3),
        formatted_line = f"({', '.join(parts)}),"
        formatted_lines.append(formatted_line)

    # Write to output file
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("\n".join(formatted_lines))
    
    print(f"Processed SQL output saved to: {output_file}")

# Run the function
process_txt_file("persons.txt", "dbperson.txt")


def is_number(value):
    """Helper function to check if a value is a number (integer or float)."""
    try:
        float(value)  # Try converting to float
        return True
    except ValueError:
        return False

import re
def is_date(value):
    """Helper function to check if a value is a date in a common format (e.g., '25-03-14')."""
    date_pattern = r'^\d{2}-\d{2}-\d{2}$'  # Match pattern like '25-03-14'
    return bool(re.match(date_pattern, value))

def reverse_person_ids(app):
    # Initialize the reversed list with None values
    reverse_app = [None] * len(app)

    # Iterate over the app list
    for person_id, number in enumerate(app):
        if number is not None:  # If the value is not None, we need to place it at the correct index
            reverse_app[number - 1] = person_id  # Store the person_id at the index specified by the number

    return reverse_app

def process_application(app, app_count, comp_file, ava_file, output_file):
    with open(comp_file, 'r', encoding='utf-8') as f:
        read_lines = f.readlines()

    lines = []

    for line in read_lines:
        parts = line.strip().split("\t")  # Split by tab
        parts = parts[1:]  # Remove the first number

         # Check each part and add quotes for non-numeric or date values
        parts = [
            f"'{part}'" if not is_number(part) and not is_date(part) else part 
            for part in parts
        ]

        person_id = int(parts[0])  # The person_id value

        # Check if the person_id is within the bounds of the fixed app list
        if person_id < len(app):
            if not app[person_id]:  # If the slot for this person_id is not already filled
                app[person_id] = app_count
                app_count += 1

            parts[0] = app[person_id]  # Update the parts[0] with the new person_id
            
            # Format as (value1, value2, value3), without quotes for numbers
            comp_line = f"({', '.join(map(str, parts))}),"
            lines.append(comp_line)

    with open(ava_file, 'r', encoding='utf-8') as f:
        readlines = f.readlines()

    for line in readlines:
        parts = line.strip().split("\t")  # Split by tab
        parts = parts[1:]  # Remove the first number

         # Check each part and add quotes for non-numeric or date values
        parts = [
            f"'{part}'" if not is_number(part) and not is_date(part) else part 
            for part in parts
        ]

        person_id = int(parts[0])  # The person_id value

        # Check if the person_id is within the bounds of the fixed app list
        if person_id < len(app):
            if not app[person_id]:  # If the slot for this person_id is not already filled
                app[person_id] = app_count
                app_count += 1

            parts[0] = app[person_id]  # Update the parts[0] with the new person_id
            
            # Format as (value1, value2, value3), without quotes for numbers
            ava_line = f"({', '.join(map(str, parts))}),"
            lines.append(ava_line)

    # Create a reversed list and add it in the same output
    reverse_app = [None] * len(app)
    for index, value in enumerate(app):
        if value is not None:
            reverse_app[value] = index
    
    # Add reverse_app to lines, formatting like (value)
    for value in reverse_app:
        if value is not None:
            lines.append(f"({value}),")

    # Write to output file without overwriting
    with open(output_file, 'a', encoding='utf-8') as f:  # Use 'a' to append
        f.write("\n".join(lines))
    
    print(f"Processed SQL output saved to: {output_file}")
    print(app)

process_application([None] * 1000,1,"competence.txt","availability.txt","allout.txt")
