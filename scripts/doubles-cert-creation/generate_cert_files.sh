#!/usr/bin/env bash

LOCATION="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

usage()
{
    echo "generate_cert_files.sh [-d domain-name | --domain domain-name] [-c common-name | --common-name common-name]"
    echo
    echo "  -d | --domain "
    echo "      set the domain name for the certificate files"
    echo "      defaults to 'localhost.ford.com'"
    echo
    echo "  -c | --common-name"
    echo "      set the common name for the certificate files"
    echo "      defaults to the domain name"
    echo
}

DOMAIN="localhost.ford.com"
COMMON_NAME=

process_command_line()
{
    while (( $# )); do

        case "$1" in

        --help|-h|-[?])
            usage
            exit 0
            ;;

        -d|--domain)
            DOMAIN="$2"
            shift
            shift
            ;;
        -d=*|--domain=*)
            DOMAIN="${1##*=}"
            shift
            ;;

        -c|--common-name)
            COMMON_NAME="$2"
            shift
            shift
            ;;
        -c=*|--common-name=*)
            COMMON_NAME="${1##*=}"
            shift
            ;;
        *)
            echo "unknown option: '$1'" >&2
            usage
            return 1
            ;;
        esac

    done

    : "${COMMON_NAME:=${DOMAIN}}"

    return 0
}

process_command_line "$@" || exit 1

"${LOCATION}"/create_root_cert_and_key.sh || exit 2
"${LOCATION}"/create_certificate_for_domain.sh "${DOMAIN}" "${COMMON_NAME}" || exit 3
"${LOCATION}"/add_root_certificate_to_keychain.sh || exit 4
