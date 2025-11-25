from crypto import sm4_decrypt


def decrypt_request_data(req_data, sign):
    key = sign[24:40]
    return sm4_decrypt(req_data, key)


if __name__ == "__main__":
    print(decrypt_request_data(
        "44ea984b3f1f36097e37fe2e9fed0eaee2b5e8af5315ca9e46ec8bdd6c3a818e9422af33359511d9826ffce6b66699f85fc3e1cb810f730403bd231dc2b5e85b428fcc33daa98e9ced2b8e4e5b935498e824006f9cccddba99f94bcfdb1175f2d66975ed96d7484db0fca6a8e4cab0676233b95e148bfa37d1050214fae8befbaa9fd15adb5c9ba6423ab8a1586f3d14",
        "690ddcf8f6a940aee3270c7d12e1d744764ffe0a1867a0505ab9289f88507320"
    ))
    # print(decrypt_request_data(
    #     "474d59b9737c0d2fd733a61c5157821c0fce427f0ee8911c8b185541c06c3996f84747c4e9e0b630562662e7f82086380d713e36ab4c97a83ebe8f400b583c55",
    #     "f71af90567c9a8da673480e0a9d4d6b6a3e4979410375dacbb128f61b0add10c"
    # ))