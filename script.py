import re

def update_file(filename, pattern, replacement):
    with open(filename, 'r') as f:
        content = f.read()
    content = re.sub(pattern, replacement, content)
    with open(filename, 'w') as f:
        f.write(content)

update_file('index.html', r'src=\"(?:images/)?([^\"]+\.(?:jpg|png))\"', r'src="images/\1"')
update_file('style.css', r'url\(\'?(?:images/)?([^\')]+\.(?:jpg|png))\'?\)', r'url("images/\1")')
update_file('index.html', r'src=\"(?:videos/)?([^\"]+\.mp4)\"', r'src="videos/\1"')
