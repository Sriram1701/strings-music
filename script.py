import re

def update_file(filename, pattern, replacement):
    with open(filename, 'r') as f:
        content = f.read()
    content = re.sub(pattern, replacement, content)
    with open(filename, 'w') as f:
        f.write(content)

update_file('index.html', r'src=\"([^\"]+\.(?:jpg|png))\"', r'src="images/\1"')
update_file('style.css', r'url\(\'?([^\')]+\.(?:jpg|png))\'?\)', r'url(\"images/\1\")')
