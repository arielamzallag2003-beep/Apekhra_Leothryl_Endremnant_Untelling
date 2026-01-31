import os
import sys
import json

def read_files(target_paths):
    result = {}
    for path_arg in target_paths:
        if os.path.isdir(path_arg):
             for root, dirs, files in os.walk(path_arg):
                for file in files:
                    if file.endswith(".md"):
                        path = os.path.join(root, file)
                        try:
                            try:
                                with open(path, 'r', encoding='utf-8') as f:
                                    result[path] = f.read()
                            except UnicodeDecodeError:
                                with open(path, 'r', encoding='cp1252') as f:
                                    result[path] = f.read()
                        except Exception as e:
                            result[path] = f"Error: {str(e)}"
        elif os.path.isfile(path_arg):
             try:
                try:
                    with open(path_arg, 'r', encoding='utf-8') as f:
                        result[path_arg] = f.read()
                except UnicodeDecodeError:
                    with open(path_arg, 'r', encoding='cp1252') as f:
                        result[path_arg] = f.read()
             except Exception as e:
                result[path_arg] = f"Error: {str(e)}"
    
    # Print JSON to stdout
    # Write to temp file
    with open('temp_content.txt', 'w', encoding='utf-8') as f:
        f.write(json.dumps(result, ensure_ascii=False, indent=2))
    print("Written to temp_content.txt")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        read_files(sys.argv[1:])
    else:
        print(json.dumps({"error": "Usage: python read_md.py <path1> <path2> ..."}))
