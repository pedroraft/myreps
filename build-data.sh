# avoid cloning if folder exists
if [ ! -d "people" ]; then
    git clone --depth 1 https://github.com/openstates/people.git
fi

# Define the folders to keep
KEEP_FOLDERS=("municipalities" "legislature" "executive")

# Convert array to a pattern for grep
KEEP_PATTERN=$(printf "|%s" "${KEEP_FOLDERS[@]}")
KEEP_PATTERN=${KEEP_PATTERN:1}  # Remove leading |

# Iterate over subdirectories in the current directory
for dir in people/*/; do
    # Remove trailing slash
    dir=${dir%/}

    # Check if the directory is in the keep list
    if ! [[ $dir =~ $KEEP_PATTERN ]]; then
        echo "Deleting: $dir"
        rm -rf "$dir"
    else
        echo "Keeping: $dir"
    fi
done
