# Welcome to Our Project
Developers:
1. Ensure that pushed files don't contain files from you local server environment, this leaves two options
    *Option 1. Keep all project files in a separate folder "src" within your server www root directory
    To keep your local apache server functioning correctly, modify the following lines in the httpd.conf file:
        DocumentRoot "${INSTALL_DIR}/www"
        <Directory "${INSTALL_DIR}/www/">
    Change those lines to:
        DocumentRoot "${INSTALL_DIR}/www/src"
        <Directory "${INSTALL_DIR}/www/src/">
    *Option 2. Carefully manage commits such that only files that were created by you are uploaded to this repository
    The first option is recommended over this option
2. Branching conventions
    - Each issue has an issue number, naming your branch something like Issue_XX where XX is the issue/epic number is recommended.
    - Do not push directly to develop or master
    - The only branch that should be merged into master should be develop
    - Do not perform merges with develop or master unless everyone has agreed to it first

To install and run our project here are the steps required:
1. _Fill this in as you work on your project_
