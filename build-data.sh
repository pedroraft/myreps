# avoid cloning if folder exists
if [ ! -d "people" ]; then
    git clone --depth 1 https://github.com/openstates/people.git
    rm -rf people/.git
fi

echo "Copying data"

# easier to test locally
cp -r people/data data

echo "Deleting unwanted data"

# Define the folders to keep
KEEP_FOLDERS=("municipalities" "legislature" "executive")

# Convert array to a pattern for grep
KEEP_PATTERN=$(printf "|%s" "${KEEP_FOLDERS[@]}")
KEEP_PATTERN=${KEEP_PATTERN:1}  # Remove leading |

# Iterate over all dynamic id directories inside data/
for id_dir in data/*/; do
    # Iterate over subdirectories inside each id folder
    for dir in "$id_dir"*/; do
        # Remove trailing slash
        dir=${dir%/}

        # Extract folder name
        folder_name=$(basename "$dir")

        # Check if the directory is in the keep list
        if ! [[ $folder_name =~ $KEEP_PATTERN ]]; then
            rm -rf "$dir"
        fi
    done
done

echo "Converting YAML to JSON"

# Function to convert YAML to JSON
convert_yaml_to_json() {
    local yaml_file="$1"
    local json_file="${yaml_file%.yml}.json"

    # Use yq to convert YAML to JSON
    yq -o=json "$yaml_file" > "$json_file"
}

# Export function for use in find -exec
export -f convert_yaml_to_json

# Find all .yml files and convert them
find data -type f -name "*.yml" -exec bash -c 'convert_yaml_to_json "$0"' {} \;

echo "Deleting yml"
find data -type f -name "*.yml" -exec rm {} \;
